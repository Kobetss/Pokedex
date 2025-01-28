const URL = "https://pokeapi.co/api/v2/pokemon/"

const searchInput = document.getElementById("search");
const pokedexContainer = document.getElementById("pokedex");

function showError(msg) {
    pokedexContainer.innerHTML = `<p class="error">${msg}</p>`;
}

async function searchPokemon() {

    const searchedPokemon = searchInput.value.toLocaleLowerCase();

    try {

        const response = await fetch(URL + searchedPokemon)

        if (!response.ok) {
            showError(`No se encontro ningun pokemon llamado ${searchedPokemon}`);
            return;
        }
        const data = await response.json();


        pokedexContainer.innerHTML =
            `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}">
        <p>Numero: ${data.id}</p>
        <p>Altura: ${data.height / 10}m</p>
        <p>Peso: ${data.weight / 10}kg</p>
        `;

    } catch (error) {
        console.error(error);
        showError('Ha ocurrido un error al buscar el Pokemon');
    }
}

document.getElementById("btn-search").addEventListener("click", searchPokemon);