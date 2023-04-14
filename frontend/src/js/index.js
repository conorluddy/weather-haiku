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

        try {
            const res = await loadHaiku(latitude, longitude)
            const { haiku, weather } = res.json()
            coordContainer.innerHTML = `${latitude}, ${longitude}`
            if (!!haiku) updateHaikuUi(haiku)
            if (!!weather) updateWeatherUi(weather)
            loadingSpinner.remove()
            new TypeShuffle(haikuElement).trigger('fx1')
        } catch (error) {
            haikuElement.innerHTML = 'Error getting weather forecast!'
            console.error(error)
            loadingSpinner.remove()
        }
    },
    (error) => {
        haikuElement.innerHTML =
            'Error getting weather. App doesnt have permission to get location.'
        console.error(error)
        loadingSpinner.remove()
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
