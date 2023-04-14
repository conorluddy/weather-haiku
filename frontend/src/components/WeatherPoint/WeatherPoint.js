import css from './WeatherPoint.styles'

const template = document.createElement('template')

template.innerHTML = `
  <style>${css}</style><slot/>
`

class WeatherPoint extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}

export default () => {
    window.customElements.define('weather-point', WeatherPoint)
}
