import { loadHaiku } from './utils'
import { TypeShuffle } from './typeShuffle'

navigator.geolocation.getCurrentPosition(getWeather, errorGetWeather)

async function getWeather(position) {
    const latitude = position.coords.latitude.toFixed(2)
    const longitude = position.coords.longitude.toFixed(2)
    const coordContainer = document.querySelector('.coords')
    const haikuContainer = document.querySelector('.haiku')
    const textElement = document.querySelector('.content')
    const ts = new TypeShuffle(textElement)
    try {
        const haikuResponse = await loadHaiku(latitude, longitude)
        const haikuJson = await haikuResponse.json()
        const [line1, line2, line3] = haikuJson.haiku.split('\n')
        document.body.classList.remove('loading')
        coordContainer.innerHTML = `${latitude}, ${longitude}`
        haikuContainer.innerHTML = `${line1} <br> ${line2} <br> ${line3}`
        ts.trigger('fx3')
    } catch (error) {
        const haikuContainer = document.querySelector('.haiku')
        haikuContainer.innerHTML =
            "Error getting weather, probably don't have permission to get your location."
        console.error(error)
    }
}

function errorGetWeather(error) {
    const haikuContainer = document.querySelector('.haiku')
    haikuContainer.innerHTML =
        "Error getting weather, probably don't have permission to get your location."
    console.error(error)
}
