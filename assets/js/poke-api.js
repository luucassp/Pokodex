const pokeApi = {
  getPokemons: async (offset = 0, limit = 5) => { 
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonBody = await response.json();
      const pokemons = jsonBody.results;

      const detailRequests = pokemons.map(pokeApi.getPokemonDetail);
      const pokemonsDetails = await Promise.all(detailRequests);
      return pokemonsDetails;
    } catch (error) {
      console.error('Error fetching Pokemons:', error);
      return[];
    }
  },
};

  pokeApi.getPokemonDetail = async (pokemon) => {
    if (!pokemon?.url) {
      console.error('Invalid Pokemon URL');
      return null;
    }
  
    try {
      const response = await fetch(pokemon.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const pokeDetail = await response.json();
      return convertPokeApiDetailToPokemon(pokeDetail) || null;
    } catch (error) {
      console.error('Error fetching Pokemon detail:', error.message);
      console.error('Pokemon URL:', pokemon.url);
      return null; // Retorna null para evitar valores `undefined`
    }
  };
  

/**
 * Converte os detalhes retornados pela API para uma instância da classe Pokemon.
 *
 * @param {Object} pokeDetail - Dados detalhados do Pokémon (retorno da API).
 * @returns {Pokemon} Instância com as propriedades mapeadas.
 */
function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
  pokemon.types = types;
  pokemon.type = types[0];

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}
