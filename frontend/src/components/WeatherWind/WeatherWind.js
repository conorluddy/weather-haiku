import css from './WeatherWind.styles'

const template = document.createElement('template')

template.innerHTML = `
  <style>${css}</style>
  <div>
    <div>
        <span id="wind-direction"></span>
        <nav>
            <small class="n">N</small>
            <small class="ne">NE</small>
            <small class="e">E</small>
            <small class="se">SE</small>
            <small class="s">S</small>
            <small class="sw">SW</small>
            <small class="w">W</small>
            <small class="nw">NW</small>
            <small class="label">WIND</small>
        </nav>
    </div>
  </div>
`

class WeatherWind extends HTMLElement {
    static get observedAttributes() {
        return ['wind-speed', 'wind-direction']
    }

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        this.updateContent()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateContent()
    }

    updateContent() {
        const windDirectionEl = this.shadowRoot.querySelector('#wind-direction')
        const windDirectionLabel = this.shadowRoot.querySelector('.label')

        const windSpeed = parseFloat(this.getAttribute('wind-speed')) || 0
        // Thanks ChatGPT :D
        const beaufortScale = Math.ceil(Math.pow(windSpeed / 0.836, 2 / 3))
        windDirectionEl.textContent = windChevrons[beaufortScale]
        windDirectionEl.style.transform = `translate(-50%, -50%) rotate(${this.getAttribute(
            'wind-direction'
        )}deg)`

        windDirectionLabel.textContent = `WIND ${
            this.getAttribute('wind-speed') + 'm/s '
        }`
    }
}

export default () => {
    window.customElements.define('weather-wind', WeatherWind)
}

const windChevrons = [
    '', // Beaufort scale 0 (no wind)
    '>', // Beaufort scale 1
    '>>', // Beaufort scale 2
    '>>>', // Beaufort scale 3
    '>>>>', // Beaufort scale 4
    '>>>>>', // Beaufort scale 5
    '>>>>>>>>', // Beaufort scale 6
    '>>>>>>>>>', // Beaufort scale 7
    '>>>>>>>>>>', // Beaufort scale 8
    // Add more entries as needed for higher wind speeds
]
