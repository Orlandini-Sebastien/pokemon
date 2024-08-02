'use client';

import { useEffect, useState, useRef } from 'react';
import { useId } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useOutsideClick } from '@/hooks/use-outside-click';
import useFetchPokemons from '@/hooks/use-fetch-pokemons';

import Loading from '@/components/loading/viewer-pokeball';
import PokemonCard from '@/components/pokemon-card';
import PokemonCardActive from '@/components/pokemon-card-active';
import BackgroundOverlay from '@/components/background-overlay';

const Pokemons = () => {
	const ref = useRef<HTMLDivElement>(null);
	const id = useId();
	const [page, setPage] = useState(0);
	const [active, setActive] = useState<
		typeof pokemonDetails[number] | boolean | null
	>(null);
	const [searchId, setSearchId] = useState<string>('');
	const [isSearching, setIsSearching] = useState(false);

	const {
		pokemonDetails,
		searchedPokemon,
		fetchPokemonById,
		isLoading,
	} = useFetchPokemons(page);

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setActive(false);
			}
		}
		if (active && typeof active === 'object') {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [active]);

	useOutsideClick(ref, () => setActive(null));

	const handleLoadMore = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const handleSearch = () => {
		const id = parseInt(searchId);
		if (!isNaN(id)) {
			fetchPokemonById(id);
			setIsSearching(true); // Activer le mode recherche
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchId(e.target.value);
		setIsSearching(false); // Désactiver le mode recherche jusqu'à ce que l'utilisateur valide la recherche
	};

	// Réinitialiser l'affichage lorsque l'input est vide
	useEffect(() => {
		if (searchId === '') {
			setIsSearching(false); // Désactiver le mode recherche si l'input est vide
		}
	}, [searchId]);

	return isLoading && page === 0 ? (
		<div className="self-center flex justify-center items-center h-full">
			<div className="self-center flex justify-center items-center h-1/2">
				<Loading />
			</div>
		</div>
	) : (
		<>
			{/* Arrière plan sombre lorsqu'il y a une card active */}
			<AnimatePresence>
				{active && typeof active === 'object' && <BackgroundOverlay />}
			</AnimatePresence>

			<AnimatePresence>
				<PokemonCardActive
					id={id}
					ref={ref}
					active={active}
					setActive={setActive}
				/>
			</AnimatePresence>

			<div className="flex justify-center mt-4">
				<input
					type="text"
					placeholder="Enter Pokémon ID"
					value={searchId}
					onChange={handleInputChange}
					className="border-2 border-gray-300 rounded-lg p-2 mr-2"
				/>
				<button
					onClick={handleSearch}
					className="bg-blue-500 text-white py-2 px-4 rounded-lg"
				>
					Search
				</button>
			</div>

			<section className="w-full p-10 m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 item-center justify-center mt-10 gap-4 rounded-xl">
				{isSearching && searchedPokemon ? (
					<PokemonCard
						key={`${id}-${searchedPokemon.id}`}
						id={id}
						setActive={setActive}
						pokemonDetail={searchedPokemon}
					/>
				) : (
					pokemonDetails.map((pokemonDetail, index) => (
						<PokemonCard
							key={`${id}-${index}`}
							id={id}
							setActive={setActive}
							pokemonDetail={pokemonDetail}
						/>
					))
				)}
			</section>

			<div className="flex justify-center mt-8">
				<button
					onClick={handleLoadMore}
					className="border-4 border-red-foreground bg-red mb-20 font-bold py-2 px-4 rounded-xl text-red-foreground"
					disabled={isLoading}
				>
					Load More
				</button>
			</div>
		</>
	);
};

export default Pokemons;
