let baseURL = "https://pokeapi.co/api/v2/pokemon";

function getAPIData(url) {
    try {
        return fetch(url).then((data) => data.json())
    } catch (error) {
        console.error(error);
    }
}

function loadPokemon() {
    let url = baseURL + "/ditto";
    getAPIData(url).then((data) => console.log(data));
}

loadPokemon();