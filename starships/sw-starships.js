import { starships } from "../data/starships.js";
import { getLastNum, removeChildren } from "../utilities/index.js";

const navList = document.querySelector("#navList");
const shipViewer = document.querySelector("#shipViewer");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal-close");
const background = document.querySelector(".modal-background");

closeButton.addEventListener('click', () => modal.classList.toggle("is-active"));
background.addEventListener('click', () => modal.classList.toggle("is-active"));

function populateNav() {
    starships.forEach((starship) => {
        const anchorItem = document.createElement('a');
        anchorItem.href = "#";
        anchorItem.textContent = starship.name;

        const listWrap = document.createElement('li');

        anchorItem.addEventListener('click', () => populateShipView(starship));

        listWrap.appendChild(anchorItem);
        navList.appendChild(listWrap);
    })
}

populateNav();

function populateShipView(shipData) {
    removeChildren(shipViewer);

    const shipFig = document.createElement('figure');
    const shipCap = document.createElement('figcaption');
    const shipNum = getLastNum(shipData.url);
    const shipImg = document.createElement('img');
    const shipModel = document.createElement('p');
    const shipMan = document.createElement('p');
    const shipClass = document.createElement('p');

    shipModel.textContent = `Model: ${shipData.model}`;
    shipMan.textContent = `Manufacturer: ${shipData.manufacturer}`;
    shipClass.textContent = `Starship Class: ${shipData.starship_class}`;
    shipCap.appendChild(shipModel);
    shipCap.appendChild(shipMan);
    shipCap.appendChild(shipClass);
    shipImg.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`;

    shipImg.addEventListener('error', () => {
        shipImg.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
        modal.classList.toggle("is-active");
    })

    shipFig.appendChild(shipImg);
    shipFig.appendChild(shipCap);
    shipViewer.appendChild(shipFig);
}