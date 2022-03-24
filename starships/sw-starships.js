import { starships } from "../data/starships.js";
import { getLastNum, removeChildren } from "../utilities/index.js";

const main = document.querySelector("#main");
const nav = document.querySelector("#nav");
const navList = document.querySelector("#navList");
const shipViewer = document.querySelector("#shipViewer");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal-close");

closeButton.addEventListener('click', () => modal.classList.toggle("is-active"));

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

    let shipNum = getLastNum(shipData.url);
    const shipImg = document.createElement('img');
    shipImg.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`;

    shipImg.addEventListener('error', () => {
        shipImg.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
        modal.classList.toggle("is-active");
    })

    shipViewer.appendChild(shipImg);
}