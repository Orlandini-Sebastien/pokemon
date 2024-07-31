import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { PokemonDetails, PokemonList } from '@/type';

interface PokemonListResponse {
	results: PokemonList[];
}

const useFetchPokemons = (page: number) => {
	const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const isInitialMount = useRef(true);

	useEffect(() => {
		// Skip the first effect run if it's the initial mount
		if (isInitialMount.current) {
			isInitialMount.current = false;
			return;
		}

		setIsLoading(true);
		const fetchData = async () => {
			try {
				const response = await axios.get<PokemonListResponse>(
					`https://pokeapi.co/api/v2/pokemon?offset=${20 * page}&limit=20`
				);

				const pokemonUrls = response.data.results.map((pokemon) => pokemon.url);
				const pokemonDetailsPromises = pokemonUrls.map((url) => axios.get(url));
				const pokemonDetailsResponses = await Promise.all(
					pokemonDetailsPromises
				);
				const newpokemonDetails = pokemonDetailsResponses.map(
					(res) => res.data
				);
				setPokemonDetails((prevPokemonDetails) => [
					...prevPokemonDetails,
					...newpokemonDetails,
				]);
			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
		};
		fetchData();
	}, [page]);

	return { pokemonDetails, isLoading };
};

export default useFetchPokemons;
