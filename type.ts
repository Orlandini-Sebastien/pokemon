export interface PokemonList {
	name: string;
	url: string;
}

export interface PokemonDetails {
	id: number;
	height: number;
	weight: number;
	types: {
		slot: number;
		type: {
			name: string;
			url: string;
		};
	}[];
	name: string;
	sprites: {
		front_default: string;
		other: {
			'official-artwork': {
				front_default: string;
			};
			dream_world: {
				front_default: string;
			};
			home: {
				front_default: string;
			};
			showdown: {
				back_default: string;
				front_default: string;
			};
		};
		versions: {
			'generation-v': {
				'black-white': {
					animated: {
						front_default: string;
					};
				};
			};
		};
	};
	stats: {
		base_stat: number;
		stat: {
			name: string;
			url: string;
		};
	}[];
}

export type PokemonType =
	| 'normal'
	| 'fighting'
	| 'flying'
	| 'poison'
	| 'ground'
	| 'rock'
	| 'bug'
	| 'ghost'
	| 'steel'
	| 'fire'
	| 'water'
	| 'grass'
	| 'electric'
	| 'psychic'
	| 'ice'
	| 'dragon'
	| 'dark'
	| 'fairy'
	| 'stellar'
	| 'unknown';

export const typeColors: Record<PokemonType, string> = {
	normal: 'bg-normal',
	fighting: 'bg-fighting',
	flying: 'bg-flying',
	poison: 'bg-poison',
	ground: 'bg-ground',
	rock: 'bg-rock',
	bug: 'bg-bug',
	ghost: 'bg-ghost',
	steel: 'bg-steel',
	fire: 'bg-fire',
	water: 'bg-water',
	grass: 'bg-grass',
	electric: 'bg-electric',
	psychic: 'bg-psychic',
	ice: 'bg-ice',
	dragon: 'bg-dragon',
	dark: 'bg-dark',
	fairy: 'bg-fairy',
	stellar: 'bg-stellar',
	unknown: 'bg-unknown',
};

export const darkTypeColors: Record<PokemonType, string> = {
	normal: '#4f4f4f', // Darker shade of #7f7f7f
	fighting: '#993300', // Darker shade of #cc6600
	flying: '#003e7f', // Darker shade of #4a8fcf
	poison: '#3f1c5e', // Darker shade of #6a2e8f
	ground: '#3e2b0e', // Darker shade of #5f3d14
	rock: '#4a5d3b', // Darker shade of #7b8a61
	bug: '#4a5d00', // Darker shade of #6b8a0e
	ghost: '#2a1a3d', // Darker shade of #4d2e5e
	steel: '#2e5e7a', // Darker shade of #3e7a8e
	fire: '#8a0f0f', // Darker shade of #b71f1b
	water: '#003c8a', // Darker shade of #1d6bb2
	grass: '#1d6f0e', // Darker shade of #2d761a
	electric: '#9f8200', // Darker shade of #c7a100
	psychic: '#a91c4e', // Darker shade of #d62866
	ice: '#004a8a', // Darker shade of #2b8dcf
	dragon: '#2b3d8a', // Darker shade of #3e4ba0
	dark: '#3c2b2a', // Darker shade of #4a3c3b
	fairy: '#a0246a', // Darker shade of #d13d9d
	stellar: '#1f5e5a', // Darker shade of #2f8b8a
	unknown: '#4b6e6a', // Darker shade of #7b9a8e
};
export const lightTypeColors: Record<PokemonType, string> = {
	normal: '#d0d4d0',
	fighting: '#ffb366',
	flying: '#cbe1f8',
	poison: '#c6a9e0',
	ground: '#d4a06a',
	rock: '#d9e0c6',
	bug: '#d4dc8b',
	ghost: '#b98cb5',
	steel: '#a3d1d8',
	fire: '#f99a91',
	water: '#8bb9f8',
	grass: '#8de17d',
	electric: '#fdf0a1',
	psychic: '#f9a0b8',
	ice: '#b4e0f8',
	dragon: '#8c90f7',
	dark: '#9f6e6e',
	fairy: '#f9b8f9',
	stellar: '#5fe3d6',
	unknown: '#a5d0c0',
};

export const maxStats = {
	hp: 255,
	attack: 190,
	defense: 250,
	'special-attack': 194,
	'special-defense': 250,
	speed: 200,
};

export interface PokemonSpecies {
	flavor_text_entries: {
		flavor_text: string;
		language: {
			name: string;
		};
		version: {
			name: string;
		};
	}[];
	id: number;
}
