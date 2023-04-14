import { loadHaiku } from './utils'
import { TypeShuffle } from './typeShuffle'
import BackgroundNoise from '../components/BackgroundNoise/BackgroundNoise'
import HaikuText from '../components/HaikuText/HaikuText'
import WeatherPoint from '../components/WeatherPoint/WeatherPoint'
import WeatherWind from '../components/WeatherWind/WeatherWind'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'

/**
 * Initialise Web Components
 */
HaikuText()
BackgroundNoise()
WeatherPoint()
WeatherWind()
LoadingSpinner()

/**
 * Get users location and then get weather and haiku
 */
navigator.geolocation.getCurrentPosition(
    async (position) => {
        const latitude = position.coords.latitude.toFixed(2)
        const longitude = position.coords.longitude.toFixed(2)
        const coordContainer = document.querySelector('.coords')
        const haikuElement = document.querySelector('haiku-text')
        const loadingSpinner = document.querySelector('loading-spinner')
        const isLocalDev = window.location.hostname === 'localhost'

        try {
            const { haiku, weather } = isLocalDev
                ? fakeResponse // TODO: remove this someday
                : (await loadHaiku(latitude, longitude)).json()

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
    },
    (error) => {
        const haikuContainer = document.querySelector('.haiku')
        haikuContainer.innerHTML =
            'Error getting weather. App doesnt have permission to get location.'
        console.error(error)
    }
)

// TODO: move into HaikuText component?
function updateHaikuUi(haiku) {
    const haikuContainer = document.querySelector('haiku-text')
    const haikuWithBreaks = haiku.replaceAll('\n', '<br />')
    haikuContainer.innerHTML = haikuWithBreaks
}

// TODO: move into WeatherPoint component?
function updateWeatherUi(weather) {
    const temperatureContainer = document.querySelector('.temperature')
    const rainContainer = document.querySelector('.rain')
    const windContainer = document.querySelector('.wind')
    const highCloudsContainer = document.querySelector('.high-clouds')
    const middleCloudsContainer = document.querySelector('.middle-clouds')
    const lowCloudsContainer = document.querySelector('.low-clouds')
    temperatureContainer.innerHTML = `${weather.data.instant.details.air_temperature}°C`
    rainContainer.innerHTML = `${weather.data.next_1_hours.details.precipitation_amount}mm`
    highCloudsContainer.innerHTML = `${weather.data.instant.details.cloud_area_fraction_high}%`
    middleCloudsContainer.innerHTML = `${weather.data.instant.details.cloud_area_fraction_medium}%`
    lowCloudsContainer.innerHTML = `${weather.data.instant.details.cloud_area_fraction_low}%`

    const weatherWindEl = document.querySelector('weather-wind')
    weatherWindEl.setAttribute(
        'wind-speed',
        weather.data.instant.details.wind_speed
    )
    weatherWindEl.setAttribute(
        'wind-direction',
        weather.data.instant.details.wind_from_direction
    )
}

const fakeResponse = {
    request_id: 'b4d39626-46b9-420c-9914-b8a4b7a91e50',
    haiku: 'Low clouds, medium too,\nHumidity and wind both high,\nRain, but just a bit.',
    weather: {
        data: {
            instant: {
                details: {
                    air_pressure_at_sea_level: 1006.6,
                    air_temperature: 10.4,
                    cloud_area_fraction: 65.6,
                    cloud_area_fraction_high: 0.8,
                    cloud_area_fraction_low: 15.6,
                    cloud_area_fraction_medium: 61.7,
                    dew_point_temperature: 3.0,
                    fog_area_fraction: 0.0,
                    relative_humidity: 60.7,
                    wind_from_direction: 313.5,
                    wind_speed: 5.1,
                    wind_speed_of_gust: null,
                },
            },
            next_1_hours: {
                summary: { symbol_code: 'lightrainshowers_day' },
                details: {
                    air_temperature_max: null,
                    air_temperature_min: null,
                    precipitation_amount: 0.1,
                    precipitation_amount_max: null,
                    precipitation_amount_min: null,
                    probability_of_precipitation: null,
                    probability_of_thunder: null,
                    ultraviolet_index_clear_sky_max: null,
                },
            },
            next_6_hours: {
                summary: { symbol_code: 'fair_day' },
                details: {
                    air_temperature_max: 10.1,
                    air_temperature_min: 5.2,
                    precipitation_amount: 0.4,
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
        time: '2023-04-14T16:00:00Z',
    },
}
