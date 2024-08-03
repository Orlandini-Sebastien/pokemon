import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PokemonDetails, PokemonSpecies } from '@/type';

interface PokemonCardProps {
	pokemonDetail: PokemonDetails;
	id: string;
	setActive: (
		value: React.SetStateAction<boolean | PokemonDetails | null>
	) => void;
	active: React.SetStateAction<boolean | PokemonDetails | null>;
	searchedPokemonSpecies: PokemonSpecies;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
	pokemonDetail,
	id,
	setActive,
	active,
	searchedPokemonSpecies,
}) => {
	return (
		<motion.div
			layoutId={`card-${pokemonDetail.name}-${id}`}
			key={`card-${pokemonDetail.name}-${id}`}
			onClick={() => setActive(pokemonDetail)}
			whileHover={{ scale: 1.05 }}
			className="relative border-4  shadow-red rounded-xl flex flex-col items-center justify-between bg-card border-red-foreground "
			style={{
				opacity:
					active && searchedPokemonSpecies?.id === pokemonDetail.id ? 0 : 1,
			}}
		>
			<motion.div
				className="text-red-foreground text-2xl font-bold border-4 rounded-tl-xl aspect-square min-w-10 p-1 absolute -top-1 -left-1 flex justify-center items-center"
				layoutId={`id-${pokemonDetail.name}-${id}`}
			>
				{pokemonDetail.id}
			</motion.div>
			<motion.div
				className="w-5/6 aspect-square flex"
				layoutId={`image-${pokemonDetail.name}-${id}`}
			>
				<Image
					className="object-center w-5/6 aspect-square object-contain"
					src={
						pokemonDetail.sprites.other['official-artwork'].front_default ||
						pokemonDetail.sprites.versions['generation-v']['black-white']
							.animated.front_default ||
						pokemonDetail.sprites.other.dream_world.front_default ||
						pokemonDetail.sprites.other.home.front_default
					}
					height={600}
					width={600}
					alt={
						pokemonDetail.sprites.versions['generation-v']['black-white']
							.animated.front_default ||
						pokemonDetail.sprites.front_default ||
						pokemonDetail.sprites.other.home.front_default
					}
					unoptimized={true}
				/>
			</motion.div>

			<motion.div
				className="text-red-foreground text-2xl font-bold capitalize"
				layoutId={`name-${pokemonDetail.name}-${id}`}
			>
				{pokemonDetail.name}
			</motion.div>
		</motion.div>
	);
};

export default PokemonCard;
