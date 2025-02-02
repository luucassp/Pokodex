class Pokemon {
    // Construtor para inicializar as propriedades do Pokémon
    constructor(number, name, types, photo) {
        this.number = number;
        this.name = name;
        this.types = Array.isArray(types) && types.length > 0 ? types : ['Unknown'];
        this.type = this.types[0]; // Define o tipo principal como o primeiro da lista
        this.photo = photo;
    }

    // Método para exibir informações do Pokémon
    displayInfo() {
        console.log(`Pokemon: ${this.name} (#${this.number})`);
        console.log(`Type: ${this.type}`);
        console.log(`Types: ${this.types.join(', ')}`);
        console.log(`Photo URL: ${this.photo}`);
    }
}

// Exemplo de uso
const bulbasaur = new Pokemon(1, 'Bulbasaur', ['Grass', 'Poison'], 'https://example.com/bulbasaur.png');
bulbasaur.displayInfo();
