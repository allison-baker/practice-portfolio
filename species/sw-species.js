import { species } from '../data/species.js';

const header = document.querySelector('#header');
const main = document.querySelector('#main');

const allSpeciesButton = document.createElement('button');
allSpeciesButton.textContent = "Show All Species";
allSpeciesButton.addEventListener('click', function() {
    speciesGrid();
})
header.appendChild(allSpeciesButton);

function speciesGrid() {
    const title = document.createElement('h1');
    title.textContent = 'All StarWars Species';
    header.appendChild(title);
    
    // loop through all the species, make figures, and populate main element
    species.forEach((specie) => {
        const speciesFig = document.createElement('figure');
        const speciesImg = document.createElement('img');
        const speciesCap = document.createElement('figcaption');

        speciesImg.src = `https://starwars-visualguide.com/assets/img/species/1.jpg`;
        speciesImg.alt = `photo of star wars species ${specie.name}`;

        speciesCap.textContent = specie.name;

        speciesFig.appendChild(speciesImg);
        speciesFig.appendChild(speciesCap);

        main.appendChild(speciesFig);
    })
}