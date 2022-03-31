import { senators } from "../data/senators.js";
import { removeChildren } from "../utilities/index.js";

const senatorGrid = document.querySelector("#senatorGrid");
const mostSenior = document.querySelector("#mostSenior");
const loyaltyList = document.querySelector("#mostLoyal");

function simplifySenators() {
    return senators.map(senator => {
        const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `;
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            gender: senator.gender,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
            seniority: +senator.seniority,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,
            nextElection: senator.next_election,
            state: senator.state
        }
    })
}

const simpleSenators = simplifySenators();

function populateGrid(senatorArr) {
    removeChildren(senatorGrid);
    
    senatorArr.forEach(senator => {
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

const mostSeniorMember = simpleSenators.reduce((acc, senator) => {
    return acc.seniority > senator.seniority ? acc : senator;
})

mostSenior.textContent = `The most senior member of the Senate is ${mostSeniorMember.name}.`;

simpleSenators.forEach(senator => {
    if (senator.loyaltyPct === 100) {
        let listItem = document.createElement("li");
        listItem.textContent = senator.name;
        loyaltyList.appendChild(listItem);
    }
})

populateGrid(simpleSenators);