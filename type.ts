export interface PokemonList {
	name: string;
	url: string;
}

export interface PokemonDetails {
	name: string;
	sprites: {
		front_default: string;
		other: {
			'official-artwork': {
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
