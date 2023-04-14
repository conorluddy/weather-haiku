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
navigator.geolocation.getCurrentPosition(
    async (position) => {
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
    windContainer.innerHTML = `${weather.data.instant.details.wind_speed}m/s ${weather.data.instant.details.wind_from_direction}°`
    highCloudsContainer.innerHTML = `${weather.data.instant.details.cloud_area_fraction_high}%`
    middleCloudsContainer.innerHTML = `${weather.data.instant.details.cloud_area_fraction_medium}%`
    lowCloudsContainer.innerHTML = `${weather.data.instant.details.cloud_area_fraction_low}%`
}
