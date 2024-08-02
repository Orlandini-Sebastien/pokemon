'use client';
import { ModeToggle } from '@/components/mode-toggle';
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
			

				<Pokemons />
			</motion.div>
		</AnimatePresence>
	);
};

export default Pokedex;
