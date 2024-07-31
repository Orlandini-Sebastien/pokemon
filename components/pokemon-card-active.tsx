'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PokemonDetails, PokemonType } from '@/type';
import { CloseIcon } from './close-icon';
import { useTheme } from 'next-themes';

interface PokemonCardActiveProps {
	id: string;
	active: PokemonDetails | boolean | null;
	setActive: React.Dispatch<
		React.SetStateAction<PokemonDetails | boolean | null>
	>;
}

const PokemonCardActive = forwardRef<HTMLDivElement, PokemonCardActiveProps>(
	({ id, active, setActive }, ref) => {
		const { theme } = useTheme();
		if (!active || typeof active !== 'object') return null;

		const typeColors: Record<PokemonType, string> = {
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

		const lightTypeColors: Record<PokemonType, string> = {
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

		const darkTypeColors: Record<PokemonType, string> = {
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

		const currentTypeColors =
			theme === 'dark' ? darkTypeColors : lightTypeColors;

		const fromColor =
			currentTypeColors[active.types[0].type.name as PokemonType] || '#ffffff';
		const toColor =
			currentTypeColors[active.types[1]?.type.name as PokemonType] ||
			currentTypeColors[active.types[0].type.name as PokemonType];

		return (
			<div className="fixed inset-0 grid place-items-center z-[100]">
				<motion.button
					key={`button-${active.name}-${id}`}
					layout
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { duration: 0.05 } }}
					className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
					onClick={() => setActive(null)}
				>
					<CloseIcon />
				</motion.button>

				<motion.div
					layoutId={`card-${active.name}-${id}`}
					animate={{ opacity: 1, height: 600, transition: { duration: 0.5 } }}
					exit={{ opacity: 0, transition: { duration: 0.5 } }}
					ref={ref}
					className={`relative w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] 
					flex flex-col sm:rounded-3xl overflow-hidden border-4 border-active-foreground
			
					 `}
					style={{
						background: `linear-gradient(to bottom right, ${fromColor}, ${toColor})`,
						opacity: 0.5,
					}}
				>
					<motion.div
						className="text-red-foreground text-2xl font-bold border-4 box-content rounded-full aspect-square min-w-10 p-1 absolute top-2 right-2 flex justify-center items-center border-card-foreground "
						layoutId={`id-${active.name}-${id}`}
					>
						{active.id}
					</motion.div>

					<motion.div layoutId={`image-${active.name}-${id}`}>
						<Image
							priority
							width={300}
							height={300}
							src={
								active.sprites.other['official-artwork'].front_default ||
								active.sprites.other.home.front_default
							}
							alt={
								active.sprites.front_default ||
								active.sprites.other.home.front_default
							}
							className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-contain"
						/>
					</motion.div>
					<div className="flex flex-col w-full gap-4 justify-between items-start p-4">
						<div className="flex gap-2 justify-center items-center w-full">
							<motion.h3
								layoutId={`name-${active.name}-${id}`}
								className="text-3xl font-bold text-primary-foreground capitalize"
							>
								{active.name}
							</motion.h3>
							<motion.h3
								layoutId={`type-${active.name}-${id}`}
								className="text-xl font-bold text-primary-foreground flex gap-2"
							>
								{active.types.map((type) => (
									<span
										className={`border-2 rounded-full p-1 px-2 ${
											typeColors[type.type.name as PokemonType] ||
											'bg-defaultColor'
										}`}
										key={type.slot}
									>
										{type.type.name}
									</span>
								))}
							</motion.h3>
						</div>

						<motion.h3
							animate={{ flex: 1, transition: { duration: 0.5 } }}
							layoutId={`stats-${active.name}-${id}`}
							className="text-primary-foreground w-full flex flex-col justify-start items-start "
						>
							{active.stats.map((stat) => (
								<div className="w-full flex " key={stat.stat.name}>
									<span className="min-w-32 my-0.5 ">{stat.stat.name}</span>
									<span>{stat.base_stat}</span>
								</div>
							))}
						</motion.h3>
					</div>
				</motion.div>
			</div>
		);
	}
);

PokemonCardActive.displayName = 'PokemonCardActive';

export default PokemonCardActive;
