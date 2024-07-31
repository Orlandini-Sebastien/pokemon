'use client';

import { useEffect, useState, useRef } from 'react';
import { useId } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useOutsideClick } from '@/hooks/use-outside-click';
import useFetchPokemons from '@/hooks/use-fetch-pokemons';

import Loading from '@/components/loading';
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

	const { pokemonDetails, isLoading } = useFetchPokemons(page);

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

	return isLoading ? (
		<Loading />
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
			<section className="w-full p-10 m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 item-center justify-center mt-20 gap-4 rounded-xl">
				{pokemonDetails.map((pokemonDetail, index) => (
					<PokemonCard
						key={`${id}-${index}`} // Update the key to avoid key conflicts
						id={id}
						setActive={setActive}
						pokemonDetail={pokemonDetail}
					/>
				))}
			</section>

			<div className="flex justify-center mt-8">
				<button
					onClick={handleLoadMore}
					className="border-4 border-red-foreground bg-red mb-20 font-bold py-2 px-4 rounded-xl text-red-foreground "
					disabled={isLoading} // Optional: Disable button while loading
				>
					Load More
				</button>
			</div>
		</>
	);
};

export default Pokemons;
