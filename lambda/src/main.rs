extern crate weather_haiku;

use dotenv::dotenv;
use lambda_runtime::{service_fn, Error, LambdaEvent};
use serde::{Deserialize, Serialize};
use weather_haiku::chatgpt::get_chatgpt_weather_haiku;
use weather_haiku::weather::structs::Timeseries;
use weather_haiku::weather::{get_current_weather, get_text_summary_from_weather};

/// This is also a made-up example. Requests come into the runtime as unicode
/// strings in json format, which can map to any structure that implements `serde::Deserialize`
/// The runtime pays no attention to the contents of the request payload.
#[derive(Deserialize)]
struct Request {
    latitude: String,
    longitude: String,
}

/// This is a made-up example of what a response structure may look like.
/// There is no restriction on what it can be. The runtime requires responses
/// to be serialized into json. The runtime pays no attention
/// to the contents of the response payload.
#[derive(Serialize)]
struct Response {
    request_id: String,
    haiku: String,
    weather: Option<Timeseries>,
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    // required to enable CloudWatch error logging by the runtime
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
    dotenv().ok();
    let latitude = event.payload.latitude;
    let longitude = event.payload.longitude;

    if latitude.is_empty() || longitude.is_empty() {
        panic!("Latutude and Longitude are required");
    }

    let weather = get_current_weather(latitude, longitude)?;
    let weather_summary = get_text_summary_from_weather(&weather);
    let haiku = get_chatgpt_weather_haiku(weather_summary)?;

    let weather_data_for_response = weather.properties.timeseries.get(3).cloned();

    let resp = Response {
        request_id: event.context.request_id,
        haiku: format!("{}", haiku),
        weather: weather_data_for_response,
    };

    Ok(resp)
}
