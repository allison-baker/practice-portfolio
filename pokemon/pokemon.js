// Select document elements
const pokeGrid = document.querySelector("#pokeGrid");
const form = document.querySelector("#newPokemonForm");

// Make API call and get data
const getAPIData = async (url) => {
  try {
    const result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.error(error);
  }
};

// Create new Pokemon
class Pokemon {
  constructor(name, height, weight, abilities, types) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.abilities = abilities;
    this.types = types;
    this.id = 0;
  }
}

function makeAbilitiesArray(commaString) {
  return commaString.split(",").map((abilityName) => {
    return {
      ability: { name: abilityName },
    };
  });
}

function makeTypesArray(spacedString) {
  return spacedString.split(" ").map((typeName) => {
    return {
      type: { name: typeName },
    };
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const pokeName = form.elements["name"].value;
  const pokeHeight = form.elements["height"].value;
  const pokeWeight = form.elements["weight"].value;
  const pokeAbilities = form.elements["abilities"].value;
  const pokeTypes = form.elements["type"].value;

  const newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    makeAbilitiesArray(pokeAbilities),
    makeTypesArray(pokeTypes)
  );

  console.log(newPokemon);
  populatePokeCard(newPokemon);
});

// Create Pokemon cards
function populatePokeCard(pokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () => pokeCard.classList.toggle("is-flipped"));

  pokeCard.appendChild(populateCardFront(pokemon));
  pokeCard.appendChild(populateCardBack(pokemon));
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";

  const pokeImg = document.createElement("img");
  if (pokemon.id === 0) {
    pokeImg.src = '../images/pokeball.png';
  } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }
  

  const pokeCap = document.createElement("figcaption");
  pokeCap.textContent = pokemon.name.toUpperCase();

  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCap);
  return pokeFront;
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";

  const label = document.createElement("h4");
  label.textContent = "Abilities";
  pokeBack.appendChild(label);

  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    const listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });
  pokeBack.appendChild(abilityList);

  return pokeBack;
}

// Load page
async function loadPokemon(offset = 0, limit = 25) {
  const data = await getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  for (const pokeData of data.results) {
    const pokemon = await getAPIData(pokeData.url);
    populatePokeCard(pokemon);
  }
}

loadPokemon();
