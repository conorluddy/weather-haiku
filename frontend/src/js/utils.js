// Preload images
const loadHaiku = (latitude, longitude) => fetch(`https://0jz8lc75s6.execute-api.eu-west-1.amazonaws.com/production/?latitude=${latitude}&longitude=${longitude}`);
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export {
    loadHaiku,
    randomNumber
}