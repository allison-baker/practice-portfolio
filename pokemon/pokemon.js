// Select document elements
const pokeGrid = document.querySelector("#pokeGrid");
const newPokemon = document.querySelector("#formBox");

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

const typeAndColor = [
  {
    name: "grass",
    color: "#758A0A",
  },
  {
    name: "fire",
    color: "#9B2226",
  },
  {
    name: "water",
    color: "#17245F"
  },
  {
    name: "bug",
    color: "#006A33",
  },
  {
    name: "dark",
    color: "#001219",
  },
  {
    name: "flying",
    color: "#005F73",
  },
  {
    name: "poison",
    color: "#5B2051",
  },
  {
    name: "electric",
    color: "#EE9B00",
  },
  {
    name: "psychic",
    color: "#8C3554",
  },
  {
    name: "ground",
    color: "#5B3605",
  },
  {
    name: "fairy",
    color: "#5F1133",
  },
  {
    name: "normal",
    color: "#8E727D"
  },
]

function getColor(pokeType) {
  for (let i=0; i<typeAndColor.length; i++) {
    if (typeAndColor[i].name === pokeType) {
      return typeAndColor[i].color;
    }
  }

  // otherwise return default gray
  return "#5A5A5A";
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
  constructor(name, height, weight, abilities, types, moves) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.abilities = abilities;
    this.types = types;
    this.moves = moves;
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

function makeMovesArray(commaString) {
  return commaString.split(",").map((movesName) => {
    return {
      move: { name: movesName },
    };
  });
}

const buttonLabel = document.createElement("h3");
buttonLabel.textContent = "Add Your Pokemon to the Grid!";
newPokemon.appendChild(buttonLabel);

const newButton = document.createElement('button');
newButton.textContent = 'New Pokemon';
newPokemon.appendChild(newButton);

newButton.addEventListener('click', () => {
  const pokeName = prompt('What is the name of your new Pokemon?', 'Alemon');
  const pokeHeight = prompt("What is the Pokemon's height?", 10);
  const pokeWeight = prompt("What is the Pokemon's weight?", 750);
  const pokeAbilities = prompt(
    "What are your Pokemon's abilities? (use a comma-separated list)",
  );
  const pokeTypes = prompt(
    "What are your Pokemon's types? (up to 2 types separated by a space)",
  );
  const pokeMoves = prompt(
    "What are your Pokemon's three favorite moves? (use a comma-separated list)"
  );

  const newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    makeAbilitiesArray(pokeAbilities),
    makeTypesArray(pokeTypes),
    makeMovesArray(pokeMoves),
  );

  console.log(newPokemon);
  populatePokeCard(newPokemon);
});

// Load page
await loadPokemon(0, 28);

function getPokemonByType(type) {
  return loadedPokemon.filter((pokemon) => pokemon.types[0].type.name === type)
}

// Table to display stats on pokemon currently in grid
const pokeTable = document.querySelector("#pokeTable");

function createPokeTable() {
  const headerRow = document.createElement("tr");
  const typeTitle = document.createElement("th");
  const countTitle = document.createElement("th");
  const colorTitle = document.createElement("th");

  typeTitle.textContent = "Primary Type";
  countTitle.textContent = "Number Displayed";
  colorTitle.textContent = "Color Key";

  headerRow.appendChild(typeTitle);
  headerRow.appendChild(countTitle);
  headerRow.appendChild(colorTitle);
  pokeTable.appendChild(headerRow);

  // Loop through type counts and add table rows
  for (let i=0; i<typeAndColor.length; i++) {
    let dataRow = document.createElement("tr");

    let typeData = document.createElement("td");
    let countData = document.createElement("td");
    let colorData = document.createElement("td");
    colorData.style.setProperty("background-color", typeAndColor[i].color);
    colorData.style.setProperty("color", "white");

    typeData.textContent = typeAndColor[i].name;
    countData.textContent = getPokemonByType(typeAndColor[i].name).length;
    colorData.textContent = typeAndColor[i].color;

    dataRow.appendChild(typeData);
    dataRow.appendChild(countData);
    dataRow.appendChild(colorData);
    pokeTable.appendChild(dataRow);
  }
}

createPokeTable();