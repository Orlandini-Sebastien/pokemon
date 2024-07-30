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

export default function Test() {
	const ref = useRef<HTMLDivElement>(null);
	const id = useId();
	const [page, setPage] = useState(0);
	const [active, setActive] = useState<
		typeof pokemonDetails[number] | boolean | null
	>(null);

	const { pokemonDetails, isLoading } = useFetchPokemons(31);

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
			<section className="w-full m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 item-center justify-center">
				{pokemonDetails.map((pokemonDetail) => (
					<PokemonCard
						id={id}
						setActive={setActive}
						pokemonDetail={pokemonDetail}
					/>
				))}
			</section>
		</>
	);
}
