'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { PokemonDetails, PokemonList } from '@/type';
import Image from 'next/image';

export default function Home() {
	const [data, setData] = useState<PokemonList[]>([]);
	const [pokemonDetails, setpokemonDetails] = useState<PokemonDetails[]>([]);

	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(0);

	interface PokemonListResponse {
		results: PokemonList[];
	}

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const response = await axios.get<PokemonListResponse>(
					`https://pokeapi.co/api/v2/pokemon?offset=${20 * page}`
				);
				console.log(response.data);
				setData(response.data.results);

				const pokemonUrls = response.data.results.map((pokemon) => pokemon.url);
				const pokemonDetailsPromises = pokemonUrls.map((url) => axios.get(url));
				const pokemonDetailsResponses = await Promise.all(
					pokemonDetailsPromises
				);
				const pokemonDetails = pokemonDetailsResponses.map((res) => res.data);
				console.log(pokemonDetails);
				setpokemonDetails(pokemonDetails);
			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);
	return isLoading ? (
		<div>is Loading</div>
	) : (
		<section className="w-full m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 item-center justify-center">
			{pokemonDetails.map((pokemonDetail) => (
				<div
					key={pokemonDetail.sprites.front_default}
					className="border rounded-lg flex flex-col justify-center items-center"
				>
					<Image
						src={pokemonDetail.sprites.front_default}
						height={300}
						width={300}
						alt={pokemonDetail.sprites.front_default}
					/>
					<div>{pokemonDetail.name}</div>
				</div>
			))}
		</section>
	);
}
