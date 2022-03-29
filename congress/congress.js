import { senators } from "../data/senators.js";
import { removeChildren } from "../utilities/index.js";

const senatorGrid = document.querySelector("#senatorGrid");

function simplifySenators() {
    return senators.map(senator => {
        const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `;
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            gender: senator.gender,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
            seniority: +senator.seniority,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,
            nextElection: senator.next_election,
            state: senator.state
        }
    })
}

const simpleSenators = simplifySenators();

function populateGrid(simpleSenators) {
    removeChildren(senatorGrid);
    
    simpleSenators.forEach(senator => {
        const senatorFig = document.createElement('figure');
        const senatorImg = document.createElement('img');
        const senatorCap = document.createElement('figcaption');

        senatorImg.src = senator.imgURL;
        senatorImg.alt = `photo of ${senator.name}`;

        senatorCap.textContent = `${senator.name}`;

        senatorFig.appendChild(senatorImg);
        senatorFig.appendChild(senatorCap);
        senatorGrid.appendChild(senatorFig);
    })
}

populateGrid(simpleSenators);

console.log(simplifySenators());