import { loadHaiku } from './utils'
import { TypeShuffle } from './typeShuffle'
import BackgroundNoise from '../components/BackgroundNoise/BackgroundNoise'
import HaikuText from '../components/HaikuText/HaikuText'
import WeatherPoint from '../components/WeatherPoint/WeatherPoint'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'

/**
 * Initialise Web Components
 */
HaikuText()
BackgroundNoise()
WeatherPoint()
LoadingSpinner()

/**
 * Get users location and then get weather and haiku
 */
navigator.geolocation.getCurrentPosition(getWeather, errorGetWeather)

async function getWeather(position) {
    const latitude = position.coords.latitude.toFixed(2)
    const longitude = position.coords.longitude.toFixed(2)
    const coordContainer = document.querySelector('.coords')
    const haikuElement = document.querySelector('haiku-text')
    const loadingSpinner = document.querySelector('loading-spinner')

    try {
        const haikuResponse = await loadHaiku(latitude, longitude)
        const { haiku, weather } = await haikuResponse.json()
        coordContainer.innerHTML = `${latitude}, ${longitude}`

        updateHaikuUi(haiku)
        updateWeatherUi(weather)
        loadingSpinner.remove()

        new TypeShuffle(haikuElement).trigger('fx1')
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
    const haikuContainer = document.querySelector('haiku-text')
    const haikuWithBreaks = haiku.replaceAll('\n', '<br />')
    haikuContainer.innerHTML = haikuWithBreaks
}

function updateWeatherUi(weather) {
    const temperatureContainer = document.querySelector('.temperature')
    const rainContainer = document.querySelector('.rain')
    const windContainer = document.querySelector('.wind')
    const highCloudsContainer = document.querySelector('.high-clouds')
    const middleCloudsContainer = document.querySelector('.middle-clouds')
    const lowCloudsContainer = document.querySelector('.low-clouds')
    temperatureContainer.innerHTML = `${weather.data.instant.details.air_temperature}°C`
    rainContainer.innerHTML = `${weather.data.next_1_hours.details.precipitation_amount}mm`
    windContainer.innerHTML = `${weather.data.instant.details.wind_speed}m/s ${weather.data.instant.details.wind_from_direction}°`
    highCloudsContainer.innerHTML = `${weather.data.instant.details.cloud_area_fraction_high}%`
    middleCloudsContainer.innerHTML = `${weather.data.instant.details.cloud_area_fraction_medium}%`
    lowCloudsContainer.innerHTML = `${weather.data.instant.details.cloud_area_fraction_low}%`
}

const test = {
    request_id: '9f8b06ff-a69a-4330-ab44-996b324d904e',
    haiku: "Clouds dance above,\nIreland's sky a canvas,\nCool breeze whispers soft,\nNature's breath, a gentle touch,\nApril raindrops grace the earth.",
    weather: {
        data: {
            instant: {
                details: {
                    air_pressure_at_sea_level: 1004.3,
                    air_temperature: 10.1,
                    cloud_area_fraction: 43.7,
                    cloud_area_fraction_high: 0.0,
                    cloud_area_fraction_low: 32.8,
                    cloud_area_fraction_medium: 38.3,
                    dew_point_temperature: 1.2,
                    fog_area_fraction: 0.0,
                    relative_humidity: 54.1,
                    wind_from_direction: 310.2,
                    wind_speed: 4.1,
                    wind_speed_of_gust: null,
                },
            },
            next_1_hours: {
                summary: { symbol_code: 'partlycloudy_day' },
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
                summary: { symbol_code: 'lightrainshowers_day' },
                details: {
                    air_temperature_max: 11.2,
                    air_temperature_min: 8.5,
                    precipitation_amount: 0.8,
                    precipitation_amount_max: null,
                    precipitation_amount_min: null,
                    probability_of_precipitation: null,
                    probability_of_thunder: null,
                    ultraviolet_index_clear_sky_max: null,
                },
            },
            next_12_hours: {
                summary: { symbol_code: 'lightrainshowers_day' },
                details: null,
            },
        },
        time: '2023-04-14T12:00:00Z',
    },
}
