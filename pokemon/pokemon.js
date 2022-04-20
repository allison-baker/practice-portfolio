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

const loadedPokemon = [];

async function loadPokemon(offset = 0, limit = 25) {
  const data = await getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  for (const pokeData of data.results) {
    const pokemon = await getAPIData(pokeData.url);
    const simplifiedPokemon = {
      id: pokemon.id,
      height: pokemon.height,
      weight: pokemon.weight,
      name: pokemon.name,
      types: pokemon.types,
      abilities: pokemon.abilities,
      moves: pokemon.moves.slice(0, 3),
    };
    loadedPokemon.push(simplifiedPokemon);
    populatePokeCard(simplifiedPokemon);
  }
}

console.log(loadedPokemon[0]);

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

function getColor(pokeType) {
  let color;
  //if(pokeType === "grass") color = '#00FF00'
  switch (pokeType) {
    case "grass":
      color = "#006A33";
      break;
    case "fire":
      color = "#9B2226";
      break;
    case "water":
      color = "#005F73";
      break;
    case "bug":
      color = "#CA6702";
      break;
    case "normal":
      color = "#001219";
      break;
    case "flying":
      color = "#00FFFF";
      break;
    case "poison":
      color = "#758A0A";
      break;
    case "electric":
      color = "#EE9B00";
      break;
    case "psychic":
      color = "#8C3554";
      break;
    case "ground":
      color = "#5B3605";
      break;
    case "fairy":
      color = "#5B2051";
      break;
    default:
      color = "#5A5A5A";
  }
  return color;
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";

  const pokeImg = document.createElement("img");
  if (pokemon.id === 0) {
    pokeImg.src = "../images/pokeball.png";
  } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }

  const pokeCap = document.createElement("figcaption");
  pokeCap.textContent = pokemon.name.toUpperCase();
  const pokeType = pokemon.types[0].type.name;
  pokeCap.style.setProperty("background-color", getColor(pokeType));

  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCap);
  return pokeFront;
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";

  const abilitiesLabel = document.createElement("h4");
  abilitiesLabel.textContent = "Abilities";
  pokeBack.appendChild(abilitiesLabel);

  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    const abilityListItem = document.createElement("li");
    abilityListItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(abilityListItem);
  });
  pokeBack.appendChild(abilityList);

  const typeLabel = document.createElement("h4");
  typeLabel.textContent = "Primary Type";
  pokeBack.appendChild(typeLabel);

  const typeText = document.createElement("p");
  const pokeType = pokemon.types[0].type.name;
  pokeBack.style.setProperty("background-color", getColor(pokeType));
  typeText.textContent = pokeType;
  pokeBack.appendChild(typeText);

  const movesLabel = document.createElement("h4");
  movesLabel.textContent = "Moves";
  pokeBack.appendChild(movesLabel);

  const movesList = document.createElement("ul");
  pokemon.moves.forEach((movesItem) => {
    const movesListItem = document.createElement("li");
    movesListItem.textContent = movesItem.move.name;
    movesList.appendChild(movesListItem);
  });
  pokeBack.appendChild(movesList);

  return pokeBack;
}

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

function makeTypesArray(string) {
  return [
    {type: { name: string },}
  ];
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

  for (let i = 0; i < form.elements.length - 1; i++) {
    form.elements[i].value = "";
  }
});

// Load page
await loadPokemon(0, 50);

function getPokemonByType(type) {
  return loadedPokemon.filter((pokemon) => pokemon.types[0].type.name === type)
}
// now figure out how to display this count in the UI
console.log(getPokemonByType('poison'));