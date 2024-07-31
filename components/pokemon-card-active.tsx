import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PokemonDetails } from '@/type';
import { CloseIcon } from './close-icon';

interface PokemonCardActiveProps {
	id: string;
	active: PokemonDetails | boolean | null;
	setActive: React.Dispatch<
		React.SetStateAction<PokemonDetails | boolean | null>
	>;
}

const PokemonCardActive = forwardRef<HTMLDivElement, PokemonCardActiveProps>(
	({ id, active, setActive }, ref) => {
		if (!active || typeof active !== 'object') return null;

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
					className=" relative w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-active  sm:rounded-3xl overflow-hidden border-4 border-active-foreground"
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
						<motion.h3
							layoutId={`name-${active.name}-${id}`}
							className="w-full text-center text-3xl  font-bold text-primary-foreground"
						>
							{active.name}
						</motion.h3>
						<motion.h3
							animate={{ flex: 'flex', transition: { duration: 0.5 } }}
							layoutId={`stats-${active.name}-${id}`}
							className="text-primary-foreground w-full flex flex-col justify-start items-start "
						>
							{active.stats.map((stat) => (
								<div className="w-full flex" key={stat.stat.name}>
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
