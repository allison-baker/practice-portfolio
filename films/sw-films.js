import { films } from '../data/films.js';

function getLastNumber(url) {
    return url[url.length - 2];
}

let filmsList = document.querySelector('#filmsList');

console.log(films[0]);

for (let i=0; i < films.length; i++) {
    let filmNum = getLastNumber(films[i].url);

    let newFigure = document.createElement('figure');
    let newImage = document.createElement('img');
    let newCaption = document.createElement('figcaption');

    newImage.src = `https://starwars-visualguide.com/assets/img/films/${filmNum}.jpg`;
    newImage.alt = `star wars ${filmNum} film movie poster`;

    newCaption.textContent = films[i].title;

    newFigure.appendChild(newImage);
    newFigure.appendChild(newCaption);
    
    filmsList.appendChild(newFigure);
}

