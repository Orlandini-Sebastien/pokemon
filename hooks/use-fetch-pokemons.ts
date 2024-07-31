'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { PokemonDetails, PokemonList } from '@/type';

interface PokemonListResponse {
	results: PokemonList[];
}

const useFetchPokemons = (page: number) => {
	console.log('USE-FETCH-POKEMON');

	const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const isInitialMount = useRef(true);

	useEffect(() => {
		// Skip the first effect run if it's the initial mount
		// if (isInitialMount.current) {
		// 	isInitialMount.current = false;
		// 	return;
		// }

		setIsLoading(true);
		const fetchData = async () => {
			console.log('USE-FETCH-POKEMON-FETCH-DATA');
			try {
				const response = await axios.get<PokemonListResponse>(
					`https://pokeapi.co/api/v2/pokemon?offset=${20 * page}&limit=20`
				);
				console.log('USE-FETCH-POKEMON-FETCH-DATA-RESPONSE');
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
				console.log('USE-FETCH-POKEMON-FETCH-DATA-RESPONSE-SETPOKEMONDETAIL');
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
