mod structs;
use structs::{Details, InstantDetails, WeatherData};
use ureq::{get, Error};

pub fn get_current_weather(lat: f32, lon: f32) -> Result<WeatherData, Error> {
    let url = format!(
        "https://api.met.no/weatherapi/locationforecast/2.0/complete?lat={}&lon={}",
        lat, lon
    );

    let response: WeatherData = get(&url)
        .set("USER_AGENT", "weatherhaiku/0.1.0")
        .call()?
        .into_json()?;

    Ok(response)
}

pub fn get_text_summary_from_weather(weather: &WeatherData) -> String {
    let mut summary = String::new();
    let upcoming_weather = &weather.properties.timeseries[3].data;
    let time = &weather.properties.timeseries[3].time;
    let coordinates = weather.geometry.coordinates;

    let InstantDetails {
        air_pressure_at_sea_level,
        relative_humidity,
        wind_from_direction,
        // cloud_area_fraction,
        cloud_area_fraction_low,
        cloud_area_fraction_medium,
        cloud_area_fraction_high,
        wind_speed,
        ..
    } = upcoming_weather.instant.details;

    summary.push_str(&format!(
        "Location: {}, {}. ",
        coordinates[0], coordinates[1]
    ));

    summary.push_str(&format!("{} ", time));

    if air_pressure_at_sea_level.is_some() {
        summary.push_str(&format!(
            "Pressure {}hPa. ",
            air_pressure_at_sea_level.unwrap()
        ));
    }

    if cloud_area_fraction_low.is_some() {
        summary.push_str(&format!(
            "low cloud {}%, ",
            cloud_area_fraction_low.unwrap()
        ));
    }

    if cloud_area_fraction_medium.is_some() {
        summary.push_str(&format!(
            "medium cloud {}%, ",
            cloud_area_fraction_medium.unwrap()
        ));
    }

    if cloud_area_fraction_high.is_some() {
        summary.push_str(&format!(
            "high cloud {}%, ",
            cloud_area_fraction_high.unwrap()
        ));
    }

    if relative_humidity.is_some() {
        summary.push_str(&format!("humidity: {}%, ", relative_humidity.unwrap()))
    }

    if wind_speed.is_some() && wind_from_direction.is_some() {
        summary.push_str(&format!(
            "wind: {}deg {}m/s. ",
            wind_from_direction.unwrap(),
            wind_speed.unwrap(),
        ))
    }

    upcoming_weather.next_6_hours.as_ref().map(|next_6_hours| {
        next_6_hours.details.as_ref().map(|details| {
            // TODO: Understand ^^^ this as_ref().map
            let Details {
                air_temperature_max,
                air_temperature_min,
                precipitation_amount,
                ..
            } = details;
            if air_temperature_min.is_some() {
                summary.push_str(&format!("temp min {}C, ", air_temperature_min.unwrap()));
            }
            if air_temperature_max.is_some() {
                summary.push_str(&format!("temp max {}C, ", air_temperature_max.unwrap()));
            }
            if precipitation_amount.is_some() {
                summary.push_str(&format!("rain {}mm", precipitation_amount.unwrap()));
            }
        })
    });

    println!("summary: {}", summary);
    summary
}
