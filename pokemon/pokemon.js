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

async function loadPokemon() {
    let url = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0";
    console.log(url);
    const pokeData = await getAPIData(url);
    populateGrid(pokeData.results);
}

function populateGrid(pokemonArr) {
    pokemonArr.forEach((pokemon) => {
        createCard(pokemon);
    });
}

function createCard(pokemon) {
    const pokeScene = document.createElement('div');
    pokeScene.className = 'scene';
    const pokeCard = document.createElement('div');
    pokeCard.className = 'card';
    pokeCard.addEventListener('click', () => pokeCard.classList.toggle('is-flipped'));

    pokeCard.appendChild(populateCardFront(pokemon));
    pokeScene.appendChild(pokeCard);
    pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
    const pokeFront = document.createElement('figure');
    pokeFront.className = 'cardFace';

    const pokeImg = document.createElement('img');
    const pokeNum = getLastNum(pokemon.url);
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNum}.png`;
    
    const pokeCap = document.createElement('figcaption');
    pokeCap.textContent = pokemon.name.toUpperCase();

    pokeFront.appendChild(pokeImg);
    pokeFront.appendChild(pokeCap);
    return pokeFront;
}

loadPokemon();