'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
	PokemonDetails,
	PokemonType,
	darkTypeColors,
	lightTypeColors,
	maxStats,
	typeColors,
} from '@/type';
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
							{active.stats.map((stat) => {
								const statName = stat.stat.name as keyof typeof maxStats;
								return (
									<div className="w-full flex font-bold " key={stat.stat.name}>
										<span className="min-w-32 my-0.5 ">
											{stat.stat.name === 'hp'
												? 'HP'
												: stat.stat.name === 'attack'
												? 'Attack'
												: stat.stat.name === 'defense'
												? 'Defense'
												: stat.stat.name === 'special-attack'
												? 'Sp.Atk'
												: stat.stat.name === 'special-defense'
												? 'Sp.Def'
												: 'Speed'}
										</span>
										<span className="border w-full text-end my-0.5 rounded relative ">
											<div className="font-bold">{stat.base_stat}</div>
											<div
												className="absolute top-0 left-0 h-full rounded opacity-60 "
												style={{
													width: `${
														(stat.base_stat * 100) / maxStats[statName]
													}%`,
													backgroundColor:
														(stat.base_stat * 100) / maxStats[statName] < 10
															? '#DEFCCF' // Vert clair
															: (stat.base_stat * 100) / maxStats[statName] < 25
															? '#86EFAC' // Vert foncé
															: (stat.base_stat * 100) / maxStats[statName] < 50
															? '#FCD34D' // Orange
															: (stat.base_stat * 100) / maxStats[statName] < 75
															? '#F87171'
															: '#BE33FA',
												}}
											/>
										</span>
									</div>
								);
							})}
						</motion.h3>
					</div>
				</motion.div>
			</div>
		);
	}
);

PokemonCardActive.displayName = 'PokemonCardActive';

export default PokemonCardActive;
