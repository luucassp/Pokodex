// Seleciona os elementos do DOM
const pokemonListEl = document.getElementById('pokemonList');
const loadMoreButtonEl = document.getElementById('loadMoreButton');

// Configurações iniciais
const MAX_POKEMONS = 151;
const PAGE_LIMIT = 10;
let currentOffset = 0;

/**
 * Cria um item de lista (HTML) para exibir os dados de um Pokémon.
 *
 * @param {Object} pokemon - Objeto contendo as informações do Pokémon.
 * @returns {string} - HTML representando o item da lista.
 */
function createPokemonListItem(pokemon) {
  // Gera o HTML para as tipagens do Pokémon
  const typesHTML = pokemon.types
    .map(type => `<li class="type ${type}">${type}</li>`)
    .join('');

  return `
    <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>
      <div class="detail">
        <ol class="types">
          ${typesHTML}
        </ol>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
      </div>
    </li>
  `;
}

/**
 * Carrega e exibe um conjunto de Pokémons usando a API.
 *
 * @param {number} offset - Posição inicial para carregar os Pokémons.
 * @param {number} limit - Quantidade de Pokémons a serem carregados.
 */

console.log('pokeApi:', pokeApi);
console.log('getPokemons:', pokeApi.getPokemons);
console.log('getPokemons:', pokeApi.getPokemons(0, 10));

async function loadPokemonItems(offset, limit) {
  try {
    const pokemons = await pokeApi.getPokemons(offset, limit);
    const pokemonItemsHTML = pokemons
      .map(createPokemonListItem)
      .join('');
    pokemonListEl.innerHTML += pokemonItemsHTML;
  } catch (error) {
    console.error('Error loading Pokemon items:', error);
  }
}

// Carrega os primeiros Pokémons ao iniciar a página
loadPokemonItems(currentOffset, PAGE_LIMIT);

// Evento para carregar mais Pokémons quando o botão é clicado
loadMoreButtonEl.addEventListener('click', () => {
  currentOffset += PAGE_LIMIT;
  const recordsRemaining = MAX_POKEMONS - currentOffset;
  const nextLimit = recordsRemaining < PAGE_LIMIT ? recordsRemaining : PAGE_LIMIT;
  loadPokemonItems(currentOffset, nextLimit);
});
