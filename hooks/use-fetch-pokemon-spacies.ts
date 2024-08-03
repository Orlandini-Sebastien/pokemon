// src/hooks/use-fetch-pokemon-spacies.ts
import { useState, useEffect } from 'react';

const useFetchPokemonSpecies = (id?: number) => {
	const [searchedPokemonSpecies, setSearchedPokemonSpecies] = useState<any>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (id === undefined || id === null) {
			setSearchedPokemonSpecies(null);
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setSearchedPokemonSpecies(data);
				setIsLoading(false);
                console.log(data);
                
			})
			.catch((error) => {
				console.error('Failed to fetch Pokémon species:', error);
				setIsLoading(false);
			});
	}, [id]);

	return { searchedPokemonSpecies, isLoading };
};

export default useFetchPokemonSpecies;
