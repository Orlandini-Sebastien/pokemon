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
		<section className="relative w-full h-full  flex justify-center items-center flex-col bg-primary">

			{/*-------------------------- TOGGLE --------------------------------*/}
			<div className="absolute  top-2 right-10 p-1 ">
				<ModeToggle />
			</div>
			{/* --------------------------------------------------------------------------- */}


			{/*-------------------------- ROUTER TO POKEDEX --------------------------------*/}
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
							className="absolute p-10 rounded-xl bg-red border-red-foreground border-4"
							onClick={() => setIsVisible(true)}
						>
							<h1 className="text-red-foreground text-3xl">Pokedex</h1>
							<Viewer />
						</motion.button>
					</>
				)}
			</AnimatePresence>
			{/*---------------------------------------------------------------------------------*/}

			{/*-------------------------- THE POKEDEX ------------------------------------------*/}
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
							className="h-14 w-14 absolute top-2 left-10 text-red-foreground"
						/>

						<Pokemons />
					</motion.div>
				)}
			</AnimatePresence>
			{/*---------------------------------------------------------------------------------*/}

		</section>
	);
}
