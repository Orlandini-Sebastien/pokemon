'use client';

import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
	PokemonDetails,
	PokemonSpecies,
	PokemonType,
	darkTypeColors,
	lightTypeColors,
	maxStats,
} from '@/type';
import { CloseIcon } from './close-icon';
import { useTheme } from 'next-themes';
import { ArrowBigRightDash, FileQuestion } from 'lucide-react';

interface PokemonCardActiveProps {
	id: string;
	active: PokemonDetails | boolean | null;
	setActive: React.Dispatch<
		React.SetStateAction<PokemonDetails | boolean | null>
	>;
	searchedPokemonSpecies: PokemonSpecies;
}
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

const PokemonCardActive = forwardRef<HTMLDivElement, PokemonCardActiveProps>(
	({ id, active, setActive, searchedPokemonSpecies }, ref) => {
		const { theme } = useTheme();
		const [info, setInfo] = useState(false);

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
					className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-50"
					onClick={() => setActive(null)}
				>
					<CloseIcon />
				</motion.button>

				<motion.div
					layoutId={`card-${active.name}-${id}`}
					initial={{
						height: 500,
					}}
					animate={{
						opacity: 1,
						height: 600,

						transition: { duration: 0.8 },
					}}
					exit={{ opacity: 0, transition: { duration: 0.5 } }}
					ref={ref}
					className={`relative w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] 
					flex flex-col sm:rounded-3xl  border-4 border-active-foreground
			
					 `}
					style={{
						background: `linear-gradient(to bottom right, ${fromColor}, ${toColor})`,
						opacity: 0.5,
					}}
				>
					<section>
						<button
							onClick={() => {
								setInfo(!info);
							}}
							className='className="text-red-foreground text-2xl font-bold box-content rounded-full aspect-square min-w-10 p-1 absolute top-2 left-2 flex justify-center items-center border-card-foreground z-50'
						>
							<FileQuestion className="w-10 h-10 text-card-foreground" />
						</button>

						<motion.div
							key={`id-${active.id}`}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 20 }}
							transition={{ duration: 0.3 }}
							className="text-red-foreground text-2xl font-bold border-4 box-content rounded-full aspect-square min-w-10 p-1 absolute top-2 right-2 flex justify-center items-center border-card-foreground"
						>
							{active.id}
						</motion.div>

						<motion.div
							className="flex justify-center items-center"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
						>
							<Image
								priority
								width={280}
								height={280}
								unoptimized
								src={
									info
										? active.sprites.other.showdown.back_default
										: active.sprites.other.showdown.front_default ||
										  active.sprites.other['official-artwork'].front_default ||
										  active.sprites.other.home.front_default
								}
								alt={
									active.sprites.other.showdown.front_default ||
									active.sprites.front_default ||
									active.sprites.other.home.front_default
								}
								className=" w-[280px] h-[280px] lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-scale-down scale-[3.3] z-50  pointer-events-none"
							/>
						</motion.div>
						<div className="flex flex-col w-full gap-2 justify-between items-start p-4 ">
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
							{info ? (
								<div className="flex flex-col justify-between items-start gap-2  h-48 ">
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0, transition: { duration: 0.05 } }}
									>
										{
											searchedPokemonSpecies?.flavor_text_entries.find(
												(entry) => entry.language.name === 'en'
											)?.flavor_text
										}
									</motion.div>
									<motion.div
										className="flex justify-around item-center "
										initial="hidden"
										animate="visible"
										exit={{ opacity: 0, transition: { duration: 0.05 } }}
										variants={{
											hidden: { opacity: 0 },
											visible: {
												opacity: 1,
												transition: {
													delayChildren: 0.3, // Délai avant de commencer l'animation des enfants
													staggerChildren: 0.2, // Délai entre chaque enfant
												},
											},
										}}
									>
										<motion.span
											className="font-bold min-w-16 "
											variants={{
												hidden: { opacity: 0 },
												visible: { opacity: 1 },
											}}
										>
											Height
										</motion.span>
										<motion.div
											variants={{
												hidden: { opacity: 0 },
												visible: { opacity: 1 },
											}}
										>
											<ArrowBigRightDash />
										</motion.div>

										<motion.div
											className="px-2 mx-2 border rounded-xl"
											variants={{
												hidden: { opacity: 0 },
												visible: { opacity: 1 },
											}}
										>
											{active.height / 10} {'m'}
										</motion.div>
									</motion.div>
									<motion.div
										className="flex justify-around item-center "
										initial="hidden"
										animate="visible"
										exit={{ opacity: 0, transition: { duration: 0.05 } }}
										variants={{
											hidden: { opacity: 0 },
											visible: {
												opacity: 1,
												transition: {
													delayChildren: 0.3, // Délai avant de commencer l'animation des enfants
													staggerChildren: 0.2, // Délai entre chaque enfant
												},
											},
										}}
									>
										<motion.span
											className="font-bold min-w-16 "
											variants={{
												hidden: { opacity: 0 },
												visible: { opacity: 1 },
											}}
										>
											Weight
										</motion.span>
										<motion.div
											variants={{
												hidden: { opacity: 0 },
												visible: { opacity: 1 },
											}}
										>
											<ArrowBigRightDash />
										</motion.div>

										<motion.div
											className="px-2 mx-2 border rounded-xl"
											variants={{
												hidden: { opacity: 0 },
												visible: { opacity: 1 },
											}}
										>
											{active.weight / 10} {'kg'}
										</motion.div>
									</motion.div>{' '}
									<motion.div
										className="flex  justify-start   item-center w-full "
										initial="hidden"
										animate="visible"
										exit={{ opacity: 0, transition: { duration: 0.05 } }}
										variants={{
											hidden: { opacity: 0 },
											visible: {
												opacity: 1,
												transition: {
													delayChildren: 0.3, // Délai avant de commencer l'animation des enfants
													staggerChildren: 0.2, // Délai entre chaque enfant
												},
											},
										}}
									>
										<motion.span
											className="font-bold min-w-16"
											variants={{
												hidden: { opacity: 0 },
												visible: { opacity: 1 },
											}}
										>
											Abilities
										</motion.span>
										<motion.div
											variants={{
												hidden: { opacity: 0 },
												visible: { opacity: 1 },
											}}
										>
											<ArrowBigRightDash />
										</motion.div>
										<div className="flex flex-wrap gap-2">
											{active.abilities.map((ability) => (
												<motion.div
													key={ability.ability.name}
													className="px-2 mx-2  rounded-xl border"
													variants={{
														hidden: { opacity: 0 },
														visible: { opacity: 1 },
													}}
												>
													{ability.ability.name}
												</motion.div>
											))}
										</div>
									</motion.div>
								</div>
							) : (
								<motion.h3
									animate={{ flex: 1, transition: { duration: 0.5 } }}
									layoutId={`stats-${active.name}-${id}`}
									className="text-primary-foreground w-full flex flex-col justify-start items-start "
								>
									{active.stats.map((stat) => {
										const statName = stat.stat.name as keyof typeof maxStats;
										return (
											<div
												className="w-full flex font-bold "
												key={stat.stat.name}
											>
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
													<motion.div
														initial={{ width: 0 }}
														animate={{
															width: `${
																(stat.base_stat * 100) / maxStats[statName]
															}%`,
															transition: {
																delay: 0.2,
																duration: 0.3,
																ease: 'easeInOut',
															},
														}}
														className="absolute top-0 left-0 h-full rounded opacity-60 "
														style={{
															backgroundColor:
																(stat.base_stat * 100) / maxStats[statName] < 10
																	? '#DEFCCF' // Vert clair
																	: (stat.base_stat * 100) /
																			maxStats[statName] <
																	  25
																	? '#86EFAC' // Vert foncé
																	: (stat.base_stat * 100) /
																			maxStats[statName] <
																	  50
																	? '#FCD34D' // Orange
																	: (stat.base_stat * 100) /
																			maxStats[statName] <
																	  75
																	? '#F87171'
																	: '#BE33FA',
														}}
													/>
												</span>
											</div>
										);
									})}
								</motion.h3>
							)}
						</div>
					</section>
				</motion.div>
			</div>
		);
	}
);

PokemonCardActive.displayName = 'PokemonCardActive';

export default PokemonCardActive;
