'use client';
import Pokemons from '@/components/pokemons';
import { AnimatePresence, motion } from 'framer-motion';
import { SquareArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import React from 'react';

const Pokedex = () => {
	const router = useRouter();
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
				className="w-full h-full"
			>
				<SquareArrowLeft
					onClick={() => router.push('/')}
					className="h-14 w-14 absolute top-2 left-10 text-red-foreground"
				/>

				<Pokemons />
			</motion.div>
		</AnimatePresence>
	);
};

export default Pokedex;
