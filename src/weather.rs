mod structs;
use structs::WeatherData;
use ureq::{get, Error};

pub fn get_current_weather(lat: f32, lon: f32) -> Result<WeatherData, Error> {
    let url = format!(
        "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat={}&lon={}",
        lat, lon
    );

    let response: WeatherData = get(&url)
        .set("USER_AGENT", "weatherpoem/0.1.0")
        .call()?
        .into_json()?;

    Ok(response)
}

pub fn get_text_summary_from_weather(weather: &WeatherData) -> String {
    let mut summary = String::new();
    let instant_details = &weather.properties.timeseries[1].data.instant.details;
    // let next_1h: = &weather.properties.timeseries[1].data.next_1_hours;
    // let next_6h: = &weather.properties.timeseries[1].data.next_6_hours;

    if instant_details.air_pressure_at_sea_level.is_some() {
        summary.push_str(&format!(
            "Air pressure is {} hPa. ",
            instant_details.air_pressure_at_sea_level.unwrap()
        ));
    }

    if instant_details.air_temperature.is_some() {
        summary.push_str(&format!(
            "Air temperature is {} degrees Celsius. ",
            instant_details.air_temperature.unwrap()
        ));
    }

    if instant_details.cloud_area_fraction.is_some() {
        summary.push_str(&format!(
            "Cloud area fraction is {} percent. ",
            instant_details.cloud_area_fraction.unwrap()
        ));
    }

    if instant_details.cloud_area_fraction_high.is_some() {
        summary.push_str(&format!(
            "cloud_area_fraction_high: {}, ",
            instant_details.cloud_area_fraction_high.unwrap()
        ))
    }
    if instant_details.cloud_area_fraction_low.is_some() {
        summary.push_str(&format!(
            "cloud_area_fraction_low: {}, ",
            instant_details.cloud_area_fraction_low.unwrap()
        ))
    }
    if instant_details.cloud_area_fraction_medium.is_some() {
        summary.push_str(&format!(
            "cloud_area_fraction_medium: {}, ",
            instant_details.cloud_area_fraction_medium.unwrap()
        ))
    }
    if instant_details.dew_point_temperature.is_some() {
        summary.push_str(&format!(
            "dew_point_temperature: {}, ",
            instant_details.dew_point_temperature.unwrap()
        ))
    }
    if instant_details.fog_area_fraction.is_some() {
        summary.push_str(&format!(
            "fog_area_fraction: {}, ",
            instant_details.fog_area_fraction.unwrap()
        ))
    }
    if instant_details.relative_humidity.is_some() {
        summary.push_str(&format!(
            "relative_humidity: {}, ",
            instant_details.relative_humidity.unwrap()
        ))
    }
    if instant_details.wind_from_direction.is_some() {
        summary.push_str(&format!(
            "wind_from_direction: {}, ",
            instant_details.wind_from_direction.unwrap()
        ))
    }
    if instant_details.wind_speed.is_some() {
        summary.push_str(&format!(
            "wind_speed: {}, ",
            instant_details.wind_speed.unwrap()
        ))
    }
    if instant_details.wind_speed_of_gust.is_some() {
        summary.push_str(&format!(
            "wind_speed_of_gust: {}, ",
            instant_details.wind_speed_of_gust.unwrap()
        ))
    }

    // if next_1_hours.details.is_some() {
    //     summary.push_str(&format!(
    //         "wind_speed_of_gust: {}, ",
    //         instant_details.wind_speed_of_gust.unwrap()
    //     ))
    // }

    summary
}
