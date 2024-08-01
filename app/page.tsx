'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Viewer from '@/components/model/viewer-pokeball';
import { ModeToggle } from '@/components/mode-toggle';
import { useRouter } from 'next/navigation';

export default function PokedexSection() {

	const router = useRouter();
	return (
		<section className="relative w-full h-full  flex justify-center items-center flex-col bg-primary max-w-7xl m-auto ">
			{/*-------------------------- TOGGLE --------------------------------*/}
			<div className="absolute  top-2 right-10 p-1 ">
				<ModeToggle />
			</div>
			{/* --------------------------------------------------------------------------- */}

			<AnimatePresence>
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
					onClick={() => router.push('/pokedex')}
				>
					<h1 className="text-red-foreground text-3xl">Pokedex</h1>
					<Viewer />
				</motion.button>
			</AnimatePresence>
		</section>
	);
}
