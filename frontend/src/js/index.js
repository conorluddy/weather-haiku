import { loadHaiku } from './utils'
import { TypeShuffle } from './typeShuffle'

navigator.geolocation.getCurrentPosition(getWeather, errorGetWeather)

async function getWeather(position) {
    const latitude = position.coords.latitude.toFixed(2)
    const longitude = position.coords.longitude.toFixed(2)
    const coordContainer = document.querySelector('.coords')
    const textElement = document.querySelector('.content')
    // const subTextElement = document.querySelector('.sub-content')

    try {
        const haikuResponse = await loadHaiku(latitude, longitude)
        const { haiku, weather } = await haikuResponse.json()
        document.body.classList.remove('loading')
        coordContainer.innerHTML = `${latitude}, ${longitude}`

        updateHaikuUi(haiku)
        updateWeatherUi(weather)
        new TypeShuffle(textElement).trigger('fx1')
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
    // const [line1, line2, line3] = haiku.split('\n')
    haikuContainer.innerHTML = haiku
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
