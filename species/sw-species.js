import { species } from "../data/species.js";
import { getLastNum, removeChildren } from "../utilities/index.js";

const header = document.querySelector("#header");
const main = document.querySelector("#main");
const nav = document.querySelector("#nav");
const title = document.createElement("h1");

function showAll() {
  title.textContent = "ALL STAR WARS SPECIES";
  header.appendChild(title);
  speciesGrid(species);
}

showAll();

// All species
const allSpeciesButton = document.createElement("button");
allSpeciesButton.textContent = "SHOW ALL SPECIES";
allSpeciesButton.addEventListener("click", showAll);
nav.appendChild(allSpeciesButton);

// Sort by mammals
const mammalButton = document.createElement("button");
mammalButton.textContent = "SORT MAMMALS";
mammalButton.addEventListener("click", function () {
  title.textContent = "STAR WARS MAMMALS";
  header.appendChild(title);
  let mammals = species.filter((specie) => specie.classification === "mammal" || specie.classification === "mammals");
  speciesGrid(mammals);
});
nav.appendChild(mammalButton);

// Sort by Amphibians
const amphButton = document.createElement("button");
amphButton.textContent = "SORT AMPHIBIANS";
amphButton.addEventListener("click", function () {
  title.textContent = "STAR WARS AMPHIBIANS";
  header.appendChild(title);
  let amphs = species.filter((specie) => specie.classification === "amphibian");
  speciesGrid(amphs);
});
nav.appendChild(amphButton);

// Sort by Unkown species
const unknownButton = document.createElement("button");
unknownButton.textContent = "SORT UNKNOWN";
unknownButton.addEventListener("click", function () {
  title.textContent = "STAR WARS UNKNOWN SPECIES";
  header.appendChild(title);
  let unknowns = species.filter((specie) => specie.classification === "unknown");
  speciesGrid(unknowns);
});
nav.appendChild(unknownButton);

// Sort by reptiles
const reptileButton = document.createElement("button");
reptileButton.textContent = "SORT REPTILIANS";
reptileButton.addEventListener("click", function () {
  title.textContent = "STAR WARS REPTILIANS";
  header.appendChild(title);
  let reptiles = species.filter(
    (specie) => specie.classification === "reptile" || specie.classification === "reptilian"
  );
  speciesGrid(reptiles);
});
nav.appendChild(reptileButton);

// Sort by other species (only 3 other ones)
const otherButton = document.createElement("button");
otherButton.textContent = "SORT OTHER";
otherButton.addEventListener("click", function () {
  title.textContent = "OTHER STAR WARS SPECIES";
  header.appendChild(title);
  let others = species.filter(
    (specie) =>
      specie.classification === "insectoid" ||
      specie.classification === "artificial" ||
      specie.classification === "gastropod"
  );
  speciesGrid(others);
});
nav.appendChild(otherButton);

function speciesGrid(speciesArray) {
  removeChildren(main);

  // loop through all the species, make figures, and populate main element
  speciesArray.forEach((specie) => {
    const speciesFig = document.createElement("figure");
    const speciesImg = document.createElement("img");
    const speciesCap = document.createElement("figcaption");
    const speciesNum = getLastNum(specie.url);

    speciesImg.src = `https://starwars-visualguide.com/assets/img/species/${speciesNum}.jpg`;
    speciesImg.alt = `photo of star wars species ${specie.name}`;

    speciesCap.textContent = specie.name;

    speciesFig.appendChild(speciesImg);
    speciesFig.appendChild(speciesCap);

    main.appendChild(speciesFig);
  });
}
