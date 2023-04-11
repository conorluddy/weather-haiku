extern crate weather_haiku;

use chrono::{DateTime, Datelike, Timelike, Utc};
use dotenv::dotenv;
use lambda_runtime::{service_fn, Error, LambdaEvent};
use rusoto_core::Region;
use rusoto_dynamodb::{AttributeValue, DynamoDb, DynamoDbClient, PutItemInput, QueryInput};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use weather_haiku::chatgpt::get_chatgpt_weather_haiku;
use weather_haiku::weather::structs::Timeseries;
use weather_haiku::weather::{get_current_weather, get_text_summary_from_weather};

const TABLE_NAME: &str = "weather_haiku_cache";

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
    timestamp_hour: String,
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
    let latitude_str = event.payload.latitude;
    let longitude_str = event.payload.longitude;

    let latitude_unrounded = match latitude_str.parse::<f32>() {
        Ok(val) => val,
        Err(_) => panic!("Latitude must be a decimal number"),
    };

    let longitude_unrounded = match longitude_str.parse::<f32>() {
        Ok(val) => val,
        Err(_) => panic!("Longitude must be a decimal number"),
    };

    if latitude_unrounded < -90.0 || latitude_unrounded > 90.0 {
        panic!("Latitude must be between -90 and 90 degrees");
    }

    if longitude_unrounded < -180.0 || longitude_unrounded > 180.0 {
        panic!("Longitude must be between -180 and 180 degrees");
    }

    let now: DateTime<Utc> = Utc::now();
    let timestamp_hour = format!(
        "{:04}-{:02}-{:02}T{:02}:00:00",
        now.year(),
        now.month(),
        now.day(),
        now.hour()
    );

    let client = DynamoDbClient::new(Region::default());

    let latitude = (latitude_unrounded * 10.0).round() / 10.0;
    let longitude = (longitude_unrounded * 10.0).round() / 10.0;

    let weather = get_current_weather(latitude, longitude)?;
    let weather_summary = get_text_summary_from_weather(&weather);

    //////// Define the key condition expression for the query

    // let key_condition_expression = String::from("lat_lon = :lat_lon_val");
    let key_condition_expression =
        String::from("lat_lon = :lat_lon_val and timestamp_hour = :timestamp_hour_val");

    let mut expression_attribute_values = HashMap::new();

    expression_attribute_values.insert(
        String::from(":lat_lon_val"),
        AttributeValue {
            s: Some(format!("{},{}", latitude, longitude)),
            ..Default::default()
        },
    );

    expression_attribute_values.insert(
        String::from(":timestamp_hour_val"),
        AttributeValue {
            s: Some(timestamp_hour.to_owned()),
            ..Default::default()
        },
    );

    let query_input = QueryInput {
        table_name: TABLE_NAME.to_owned(),
        key_condition_expression: Some(key_condition_expression),
        expression_attribute_values: Some(expression_attribute_values),
        ..Default::default()
    };

    // Execute the query
    match client.query(query_input).await {
        Ok(output) => {
            if let Some(items) = output.items {
                if items.len() > 0 {
                    let first = items[0].clone();

                    // If the query returns any items, return the haiku from the first item
                    let haiku = first["haiku"].clone().s.unwrap();
                    println!("DynamoDB haiku: {}", haiku);

                    let weather_data_for_response = weather.properties.timeseries.get(3).cloned();
                    let resp = Response {
                        request_id: event.context.request_id,
                        haiku: format!("{}", haiku),
                        weather: weather_data_for_response,
                    };
                    return Ok(resp);
                }
            }
        }
        Err(e) => println!("Error querying DynamoDB: {:?}", e),
    }

    let haiku = get_chatgpt_weather_haiku(weather_summary)?;

    let item = CacheItem {
        lat_lon: format!("{},{}", latitude, longitude),
        timestamp_hour: timestamp_hour.to_owned(),
        haiku: haiku.to_owned(),
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
        String::from("timestamp_hour"),
        AttributeValue {
            s: Some(item.timestamp_hour),
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

    let weather_data_for_response = weather.properties.timeseries.get(3).cloned();

    let resp = Response {
        request_id: event.context.request_id,
        haiku: format!("{}", haiku),
        weather: weather_data_for_response,
    };

    Ok(resp)
}
