'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Pokemons from '@/components/pokemons'; // Assurez-vous que le chemin est correct
import { CloseIcon } from '@/components/close-icon';

export default function PokedexSection() {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<section className="relative w-full h-full  flex justify-center items-center flex-col">
			<AnimatePresence>
				{!isVisible && (
					<motion.button
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{
							opacity: 0,
							scale: 0.9,
							transition: {
								delay: 0.1,
							},
						}}
						transition={{ delay: 0.3, duration: 0.3 }}
						className="p-4 border rounded-xl bg-slate-100 absolute top-1/2 left-1/2"
						onClick={() => setIsVisible(true)}
					>
						Pokedex
					</motion.button>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{isVisible && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.3 }}
						className="w-full h-full"
					>
						<button
							className="p-4 border rounded-xl bg-slate-100"
							onClick={() => setIsVisible(!isVisible)}
						>
							<CloseIcon />
						</button>
						<Pokemons />
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
