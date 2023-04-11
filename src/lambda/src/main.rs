extern crate weather_haiku;

use std::collections::HashMap;

use chrono::{DateTime, Utc};
use dotenv::dotenv;
use lambda_runtime::{service_fn, Error, LambdaEvent};
use rusoto_core::Region;
use rusoto_dynamodb::{AttributeValue, DynamoDb, DynamoDbClient, PutItemInput};
use serde::{Deserialize, Serialize};
use weather_haiku::chatgpt::get_chatgpt_weather_haiku;
use weather_haiku::weather::structs::Timeseries;
use weather_haiku::weather::{get_current_weather, get_text_summary_from_weather};

const TABLE_NAME: &str = "haiku_cache";

#[derive(Deserialize)]
struct Request {
    latitude: String,
    longitude: String,
}

#[derive(Serialize)]
struct Response {
    request_id: String,
    haiku: String,
    weather: Option<Timeseries>,
}

#[derive(Serialize, Deserialize)]
struct CacheItem {
    lat_lon: String,
    timestamp_utc: String,
    haiku: String,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    dotenv().ok();
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        // disable printing the name of the module in every log line.
        .with_target(false)
        // this needs to be set to false, otherwise ANSI color codes will
        // show up in a confusing manner in CloudWatch logs.
        // .with_ansi(false)
        // disabling time is handy because CloudWatch will add the ingestion time.
        .without_time()
        .init();

    let func = service_fn(my_handler);
    lambda_runtime::run(func).await?;
    Ok(())
}

pub(crate) async fn my_handler(event: LambdaEvent<Request>) -> Result<Response, Error> {
    let latitude = event.payload.latitude;
    let longitude = event.payload.longitude;

    if latitude.is_empty() || longitude.is_empty() {
        panic!("Latitude and Longitude are required");
    }

    let timestamp_utc = Utc::now().to_rfc3339();
    let client = DynamoDbClient::new(Region::default());

    let item = CacheItem {
        lat_lon: String::from("40.7128,-74.0060"),
        timestamp_utc: timestamp_utc.to_owned(),
        haiku: "test".to_owned(),
    };

    let mut item_values = HashMap::new();
    item_values.insert(
        String::from("lat_lon"),
        AttributeValue {
            s: Some(item.lat_lon),
            ..Default::default()
        },
    );
    item_values.insert(
        String::from("timestamp_utc"),
        AttributeValue {
            s: Some(item.timestamp_utc),
            ..Default::default()
        },
    );
    item_values.insert(
        String::from("haiku"),
        AttributeValue {
            s: Some(item.haiku),
            ..Default::default()
        },
    );

    // Create a PutItemInput struct with the table name and the item to put
    let put_item_input = PutItemInput {
        table_name: String::from(TABLE_NAME),
        item: item_values,
        ..Default::default()
    };

    // Use the client to put the item into the table
    match client.put_item(put_item_input).await {
        Ok(_) => println!("Successfully put item into DynamoDB"),
        Err(e) => println!("Error putting item into DynamoDB: {:?}", e),
    }

    let weather = get_current_weather(latitude, longitude)?;
    let haiku = "test haiku";

    // let weather_summary = get_text_summary_from_weather(&weather);
    // let haiku = get_chatgpt_weather_haiku(weather_summary)?;

    let weather_data_for_response = weather.properties.timeseries.get(3).cloned();

    let resp = Response {
        request_id: event.context.request_id,
        haiku: format!("{}", haiku),
        weather: weather_data_for_response,
    };

    Ok(resp)
}
