import { getLastNum } from "../utilities/index.js";

const pokeGrid = document.querySelector('#pokeGrid');

const getAPIData = async (url) => {
    try {
        const result = await fetch(url);
        return await result.json();
    } catch (error) {
        console.error(error);
    }
}

async function loadPokemon(offset = 0, limit = 25) {
    const data = await getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    for (const pokeData of data.results) {
        const pokemon = await getAPIData(pokeData.url);
        createCard(pokemon);
    }
}

function createCard(pokemon) {
    const pokeScene = document.createElement('div');
    pokeScene.className = 'scene';
    const pokeCard = document.createElement('div');
    pokeCard.className = 'card';
    pokeCard.addEventListener('click', () => pokeCard.classList.toggle('is-flipped'));

    pokeCard.appendChild(populateCardFront(pokemon));
    pokeCard.appendChild(populateCardBack(pokemon));
    pokeScene.appendChild(pokeCard);
    pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
    const pokeFront = document.createElement('figure');
    pokeFront.className = 'cardFace front';

    const pokeImg = document.createElement('img');
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    
    const pokeCap = document.createElement('figcaption');
    pokeCap.textContent = pokemon.name.toUpperCase();

    pokeFront.appendChild(pokeImg);
    pokeFront.appendChild(pokeCap);
    return pokeFront;
}

function populateCardBack(pokemon) {
    const pokeBack = document.createElement('div');
    pokeBack.className = "cardFace back";
    const label = document.createElement('h4');
    label.textContent = 'Abilities';
    pokeBack.appendChild(label);

    return pokeBack;
}

loadPokemon();