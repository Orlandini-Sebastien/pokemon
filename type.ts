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
