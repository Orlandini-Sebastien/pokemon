export interface PokemonList {
	name: string;
	url: string;
}

export interface PokemonDetails {
	name: string;
	sprites: {
		front_default: string;
	};
}
