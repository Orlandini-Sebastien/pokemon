'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Pokemons from '@/components/pokemons'; // Assurez-vous que le chemin est correct
import Viewer from '@/components/model/viewer-pokeball';
import { ModeToggle } from '@/components/mode-toggle';
import { SquareArrowLeft } from 'lucide-react';

export default function PokedexSection() {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<section className="relative w-full h-full  flex justify-center items-center flex-col">
			<div className="absolute  top-2 right-10 p-1">
				<ModeToggle />
			</div>

			<AnimatePresence>
				{!isVisible && (
					<>
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
							className="absolute p-10 border rounded-xl bg-container  "
							onClick={() => setIsVisible(true)}
						>
							<h1 className="h1">Pokedex</h1>
							<Viewer />
						</motion.button>
					</>
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
						<SquareArrowLeft
							onClick={() => setIsVisible(!isVisible)}
							color='light-gray'
							className="h-14 w-14 text-primary-forward absolute top-2 left-10  "
						/>

						<Pokemons />
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
