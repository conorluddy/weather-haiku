import { loadHaiku } from './utils';
import { TypeShuffle } from './typeShuffle';

navigator.geolocation.getCurrentPosition(getWeather)

function getWeather(position) {
    const latitude = position.coords.latitude.toFixed(2);
    const longitude = position.coords.longitude.toFixed(2);

    loadHaiku(latitude, longitude).then(res => res.json()).then(response => {

        const [line1, line2, line3] = response.haiku.split('\n');

        document.body.classList.remove('loading');
        
        const coordContainer = document.querySelector('.coords');
        const haikuContainer = document.querySelector('.haiku');

        coordContainer.innerHTML = `${latitude}, ${longitude}`;
        haikuContainer.innerHTML = `${line1} <br> ${line2} <br> ${line3}`;
        
        const textElement = document.querySelector('.content');
        
        const ts = new TypeShuffle(textElement);
        
        ts.trigger('fx1');

        [...document.querySelectorAll('.effects > button')].forEach(button => {
            button.addEventListener('click', () => {
                ts.trigger(`fx${button.dataset.fx}`);
            });
        });

    });
}