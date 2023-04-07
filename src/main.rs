mod chatgpt;
mod weather;

use chatgpt::get_chatgpt_weather_haiku;
use dotenv::dotenv;
use weather::{get_current_weather, get_text_summary_from_weather};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    // Hardcoded to Dublin for now (lambda will use the location from the event)
    let lat = "53.34".to_string();
    let lon = "-6.26".to_string();

    let weather = get_current_weather(lat, lon)?;
    let weather_summary = get_text_summary_from_weather(&weather);
    let haiku = get_chatgpt_weather_haiku(weather_summary)?;

    println!("{}", haiku);

    Ok(())
}
