const URL = "https://pokeapi.co/api/v2/pokemon/";

const searchInput = document.getElementById("search");
const pokedexContainer = document.getElementById("pokedex-info");

function showError(msg) {
    pokedexContainer.innerHTML = `<p class="error">${msg}</p>`;
}

async function searchPokemon() {
    const searchedPokemon = searchInput.value.toLocaleLowerCase();

    try {
        const response = await fetch(URL + searchedPokemon);

        if (!response.ok) {
            showError(`No se encontró ningún Pokémon llamado ${searchedPokemon}`);
            return;
        }

        const data = await response.json();

        // Obtener los tipos del Pokémon
        const types = data.types.map(typeInfo => typeInfo.type.name).join(", ");

        pokedexContainer.innerHTML = `<div>
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}">
            </div><div>
            <p>Numero: ${data.id}</p>
            <p>Altura: ${data.height / 10}m</p>
            <p>Peso: ${data.weight / 10}kg</p>
            <p>Tipos: ${types}</p>
            </div>
        `;
    } catch (error) {
        console.error(error);
        showError('Ha ocurrido un error al buscar el Pokémon');
    }
}

document.getElementById("btn-search").addEventListener("click", searchPokemon);