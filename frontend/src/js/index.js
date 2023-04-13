// import { loadHaiku } from './utils'
import { TypeShuffle } from './typeShuffle'

navigator.geolocation.getCurrentPosition(getWeather, errorGetWeather)

async function getWeather(position) {
    const latitude = position.coords.latitude.toFixed(2)
    const longitude = position.coords.longitude.toFixed(2)
    const coordContainer = document.querySelector('.coords')
    const textElement = document.querySelector('.content')
    // const subTextElement = document.querySelector('.sub-content')

    try {
        // const haikuResponse = await loadHaiku(latitude, longitude)
        const { haiku, weather } = dummyData //await haikuResponse.json()
        document.body.classList.remove('loading')
        coordContainer.innerHTML = `${latitude}, ${longitude}`

        updateHaikuUi(haiku)
        updateWeatherUi(weather)
        new TypeShuffle(textElement).trigger('fx1')
        // new TypeShuffle(subTextElement).trigger('fx1')
    } catch (error) {
        const haikuContainer = document.querySelector('.haiku')
        haikuContainer.innerHTML = 'Error getting weather...'
        console.error(error)
    }
}

function errorGetWeather(error) {
    const haikuContainer = document.querySelector('.haiku')
    haikuContainer.innerHTML =
        'Error getting weather. App doesnt have permission to get location.'
    console.error(error)
}

function updateHaikuUi(haiku) {
    const haikuContainer = document.querySelector('.haiku')
    const [line1, line2, line3] = haiku.split('\n')
    haikuContainer.innerHTML = `${line1} <br> ${line2} <br> ${line3}`
}

function updateWeatherUi(weather) {
    const temperatureContainer = document.querySelector(
        '.temperature span:last-child'
    )
    const rainContainer = document.querySelector('.rain span:last-child')
    const windContainer = document.querySelector('.wind span:last-child')
    const highCloudsContainer = document.querySelector(
        '.high-clouds span:last-child'
    )
    const middleCloudsContainer = document.querySelector(
        '.middle-clouds span:last-child'
    )
    const lowCloudsContainer = document.querySelector(
        '.low-clouds span:last-child'
    )
    temperatureContainer.innerHTML = `${weather.data.instant.details.air_temperature}°C`
    rainContainer.innerHTML = `${weather.data.next_1_hours.details.precipitation_amount}mm`
    windContainer.innerHTML = `${weather.data.instant.details.wind_speed}m/s ${weather.data.instant.details.wind_from_direction}°`
    highCloudsContainer.innerHTML = `${weather.data.instant.details.cloud_area_fraction_high}%`
    middleCloudsContainer.innerHTML = `${weather.data.instant.details.cloud_area_fraction_medium}%`
    lowCloudsContainer.innerHTML = `${weather.data.instant.details.cloud_area_fraction_low}%`
}

const dummyData = {
    request_id: 'bfe11d19-ea80-4682-ba11-38cd2d62c113',
    haiku: 'Low clouds gather near,\nMedium layers stretch above,\nHigh clouds disappear.\n\nChilly winds blow strong,\nRain refrains from joining in,\nHumidity clings.',
    weather: {
        data: {
            instant: {
                details: {
                    air_pressure_at_sea_level: 994.8,
                    air_temperature: 6.2,
                    cloud_area_fraction: 18.0,
                    cloud_area_fraction_high: 0.0,
                    cloud_area_fraction_low: 16.4,
                    cloud_area_fraction_medium: 5.5,
                    dew_point_temperature: 3.5,
                    fog_area_fraction: 0.0,
                    relative_humidity: 82.8,
                    wind_from_direction: 277.5,
                    wind_speed: 9.7,
                    wind_speed_of_gust: null,
                },
            },
            next_1_hours: {
                summary: { symbol_code: 'fair_night' },
                details: {
                    air_temperature_max: null,
                    air_temperature_min: null,
                    precipitation_amount: 0.0,
                    precipitation_amount_max: null,
                    precipitation_amount_min: null,
                    probability_of_precipitation: null,
                    probability_of_thunder: null,
                    ultraviolet_index_clear_sky_max: null,
                },
            },
            next_6_hours: {
                summary: { symbol_code: 'fair_night' },
                details: {
                    air_temperature_max: 5.9,
                    air_temperature_min: 4.6,
                    precipitation_amount: 0.0,
                    precipitation_amount_max: null,
                    precipitation_amount_min: null,
                    probability_of_precipitation: null,
                    probability_of_thunder: null,
                    ultraviolet_index_clear_sky_max: null,
                },
            },
            next_12_hours: {
                summary: { symbol_code: 'fair_day' },
                details: null,
            },
        },
        time: '2023-04-12T21:00:00Z',
    },
}
