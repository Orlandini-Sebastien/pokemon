import React, { useId } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PokemonDetails } from '@/type';

interface PokemonCardProps {
	pokemonDetail: PokemonDetails;
	id: string;
	setActive: (
		value: React.SetStateAction<boolean | PokemonDetails | null>
	) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
	pokemonDetail,
	id,
	setActive,
}) => {
	return (
		<motion.div
			layoutId={`card-${pokemonDetail.name}-${id}`}
			key={`card-${pokemonDetail.name}-${id}`}
			onClick={() => setActive(pokemonDetail)}
			className="border w-full rounded-lg flex flex-col justify-center items-center "
		>
			<motion.div layoutId={`image-${pokemonDetail.name}-${id}`}>
				<Image
					src={
						pokemonDetail.sprites.versions['generation-v']['black-white']
							.animated.front_default
					}
					height={300}
					width={300}
					alt={pokemonDetail.sprites.front_default}
				/>
			</motion.div>

			<motion.div layoutId={`name-${pokemonDetail.name}-${id}`}>
				{pokemonDetail.name}
			</motion.div>
			<motion.div
				layoutId={`stats-${pokemonDetail.name}-${id}`}
				className="hidden w-full"
			>
				{pokemonDetail.stats.map((stat) => (
					<div key={stat.stat.name}>
						{stat.stat.name} : {stat.base_stat}
					</div>
				))}
			</motion.div>
		</motion.div>
	);
};

export default PokemonCard;
