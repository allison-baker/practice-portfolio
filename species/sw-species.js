import { species } from "../data/species.js";
import { getLastNum, removeChildren } from "../utilities/index.js";

const header = document.querySelector("#header");
const main = document.querySelector("#main");
const title = document.createElement("h1");

// All species
const allSpeciesButton = document.createElement("button");
allSpeciesButton.textContent = "Show All Species";
allSpeciesButton.addEventListener("click", function () {
  title.textContent = "All StarWars Species";
  header.appendChild(title);
  speciesGrid(species);
});
header.appendChild(allSpeciesButton);

// Sort by mammals
const mammalButton = document.createElement("button");
mammalButton.textContent = "Sort Mammals";
mammalButton.addEventListener("click", function () {
  title.textContent = "StarWars Mammals";
  header.appendChild(title);
  let mammals = species.filter((specie) => specie.classification === "mammal" || specie.classification === "mammals");
  speciesGrid(mammals);
});
header.appendChild(mammalButton);

// Sort by Amphibians
const amphButton = document.createElement("button");
amphButton.textContent = "Sort Amphibians";
amphButton.addEventListener("click", function () {
  title.textContent = "StarWars Amphibians";
  header.appendChild(title);
  let amphs = species.filter((specie) => specie.classification === "amphibian");
  speciesGrid(amphs);
});
header.appendChild(amphButton);

// Sort by Unkown species
const unknownButton = document.createElement("button");
unknownButton.textContent = "Sort Unknown";
unknownButton.addEventListener("click", function () {
  title.textContent = "StarWars Unknowns";
  header.appendChild(title);
  let unknowns = species.filter((specie) => specie.classification === "unknown");
  speciesGrid(unknowns);
});
header.appendChild(unknownButton);

// Sort by reptiles
const reptileButton = document.createElement("button");
reptileButton.textContent = "Sort Reptiles";
reptileButton.addEventListener("click", function () {
  title.textContent = "StarWars Reptiles";
  header.appendChild(title);
  let reptiles = species.filter(
    (specie) => specie.classification === "reptile" || specie.classification === "reptilian"
  );
  speciesGrid(reptiles);
});
header.appendChild(reptileButton);

// Sort by other species (only 3 other ones)
const otherButton = document.createElement("button");
otherButton.textContent = "Sort Other";
otherButton.addEventListener("click", function () {
  title.textContent = "Other StarWars Species";
  header.appendChild(title);
  let others = species.filter(
    (specie) =>
      specie.classification === "insectoid" ||
      specie.classification === "artificial" ||
      specie.classification === "gastropod"
  );
  speciesGrid(others);
});
header.appendChild(otherButton);

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
