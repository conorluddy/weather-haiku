import css from 'bundle-text:./styles.css'

const template = document.createElement('template')

template.innerHTML = `
  <style>${css}</style><slot/>
`

class HaikuText extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}

export default () => {
    window.customElements.define('haiku-text', HaikuText)
}
