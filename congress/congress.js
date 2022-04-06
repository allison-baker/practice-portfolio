import { senators } from "../data/senators.js";
import { representatives } from "../data/representatives.js";
import { removeChildren } from "../utilities/index.js";

const nav = document.querySelector("#nav");
const info = document.querySelector("#info");
const congressGrid = document.querySelector("#congressGrid");

// Simplify members of either array
function simplifyMembers(arr) {
  return arr.map((member) => {
    const middleName = member.middle_name ? ` ${member.middle_name} ` : ` `;
    return {
      id: member.id,
      name: `${member.first_name}${middleName}${member.last_name}`,
      party: member.party,
      gender: member.gender,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${member.govtrack_id}-200px.jpeg`,
      seniority: +member.seniority,
      missedVotesPct: member.missed_votes_pct,
      loyaltyPct: member.votes_with_party_pct,
      nextElection: member.next_election,
      state: member.state,
    };
  });
}

// Use function to create simplified arrays
const simpleSenators = simplifyMembers(senators);
const simpleReps = simplifyMembers(representatives);
const allMembers = [...simpleSenators, ...simpleReps];

// Function to populate grid with either array
function populateGrid(congressArr, string) {
  removeChildren(congressGrid);

  congressArr.forEach((member) => {
    const memberFig = document.createElement("figure");
    const memberImg = document.createElement("img");
    const memberCap = document.createElement("figcaption");

    memberImg.src = member.imgURL;
    memberImg.alt = `photo of ${member.name}`;

    memberCap.textContent = `${member.name}, ${member.party}`;

    memberFig.appendChild(memberImg);
    memberFig.appendChild(memberCap);
    congressGrid.appendChild(memberFig);
  });
}

// Populate info div with facts
function populateInfo(arr, string) {
  removeChildren(info);

  const title = document.createElement("h2");
  title.textContent = `Members of ${string}`;
  info.appendChild(title);

  let count = document.createElement("p");
  let mostSenior = document.createElement("p");
  let loyaltyParagraph = document.createElement("p");
  let loyaltyList = document.createElement("ul");

  count.textContent = `There are ${arr.length} members of ${string}.`

  const mostSeniorMember = arr.reduce((acc, member) => {
    return acc.seniority > member.seniority ? acc : member;
  });

  const biggestMissedVotesPct = arr.reduce((acc, member) => {
    return acc.missedVotesPct > member.missedVotesPct ? acc : member;
  });

  const biggestVacationerList = arr
    .filter((member) => member.missedVotesPct === biggestMissedVotesPct.missedVotesPct)
    .map((member) => member.name)
    .join(" and ");

  mostSenior.textContent = `The most senior member of ${string} is ${mostSeniorMember.name} and the biggest vacationer is ${biggestVacationerList}.`;

  loyaltyParagraph.textContent = `The members from ${string} who have 100% voting loyalty to their parties are:`

  arr.forEach((member) => {
    if (member.loyaltyPct === 100) {
      let listItem = document.createElement("li");
      listItem.textContent = member.name;
      loyaltyList.appendChild(listItem);
    }
  });

  info.appendChild(count);
  info.appendChild(mostSenior);
  info.appendChild(loyaltyParagraph);
  info.appendChild(loyaltyList);
}

// Create buttons to switch between senate and reps
const senatorsButton = document.createElement("button");
senatorsButton.textContent = "Show All Senators";
senatorsButton.addEventListener("click", () => {
  populateGrid(simpleSenators, "the Senate");
  populateInfo(simpleSenators, "the Senate")
});
nav.appendChild(senatorsButton);

const womenSButton = document.createElement("button");
womenSButton.textContent = "Sort Senate by Women";
womenSButton.addEventListener('click', () => {
  let arr = simpleSenators.filter(senator => senator.gender === 'F');
  populateGrid(arr, "the women of the Senate");
  populateInfo(arr, "the women of the Senate");
})
nav.appendChild(womenSButton);

const menSButton = document.createElement("button");
menSButton.textContent = "Sort Senate by Men";
menSButton.addEventListener('click', () => {
  let arr = simpleSenators.filter(senator => senator.gender === 'M');
  populateGrid(arr, "the men of the Senate");
  populateInfo(arr, "the men of the Senate");
})
nav.appendChild(menSButton);

const repsButton = document.createElement("button");
repsButton.textContent = "Show All Representatives";
repsButton.addEventListener("click", () => {
  populateGrid(simpleReps, "the House of Representatives");
  populateInfo(simpleReps, "the House of Representatives");
});
nav.appendChild(repsButton);

const womenRButton = document.createElement("button");
womenRButton.textContent = "Sort House of Reps by Women";
womenRButton.addEventListener('click', () => {
  let arr = simpleReps.filter(senator => senator.gender === 'F');
  populateGrid(arr, "the women of the House of Representatives");
  populateInfo(arr, "the women of the House of Representatives");
})
nav.appendChild(womenRButton);

const menRButton = document.createElement("button");
menRButton.textContent = "Sort House of Reps by Men";
menRButton.addEventListener('click', () => {
  let arr = simpleReps.filter(senator => senator.gender === 'M');
  populateGrid(arr, "the men of the House of Representatives");
  populateInfo(arr, "the men of the House of Representatives");
})
nav.appendChild(menRButton);

const allButton = document.createElement("button");
allButton.textContent = "Show All Congress Members";
allButton.addEventListener('click', () => {
  populateGrid(allMembers, "Congress");
  populateInfo(allMembers, "Congress");
});
nav.appendChild(allButton);

populateGrid(allMembers, "Congress");
populateInfo(allMembers, "Congress");