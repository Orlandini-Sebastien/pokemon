'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Viewer from '@/components/model/viewer-pokeball';
import { ModeToggle } from '@/components/mode-toggle';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState, RefObject } from 'react';
import {
	PikatchuLeftToRight,
	PikatchuRightToLeft,
} from '../components/pikatchu-run';
import Image from 'next/image';

export default function PokedexSection() {
	const router = useRouter();
	const { theme, resolvedTheme } = useTheme();
	const videoRef: RefObject<HTMLVideoElement> = useRef(null);
	const [hasPlayed, setHasPlayed] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (videoRef.current && !hasPlayed) {
			videoRef.current
				.play()
				.then(() => {
					setHasPlayed(true);
				})
				.catch((error: Error) => {
					console.error('Erreur lors de la lecture de la vidéo:', error);
				});
		}
	}, [hasPlayed]);

	useEffect(() => {
		if (videoRef.current && mounted) {
			videoRef.current.pause();
			videoRef.current.load();
			videoRef.current.play();
		}
	}, [resolvedTheme, mounted]);

	if (!mounted) return null;

	return (
		<section className="relative h-[100vh] w-full overflow-hidden">
			{/* Conteneur avec effet de flou */}
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{ backgroundImage: `url(/wallpaper_pokeball.jpg)` }}
			></div>
			<div className="absolute inset-0 bg-background opacity-85"></div>

			{/* Contenu principal au-dessus du fond flouté */}
			<div className="relative z-10 w-full h-full flex justify-center items-center flex-col max-w-7xl m-auto">
				<div className="absolute p-1 top-5 right-5">
					<ModeToggle />
				</div>

				<PikatchuLeftToRight />
				<motion.div
					className="my-10 -mt-20 ml-10  "
					initial={{ opacity: 0, filter: 'blur(10px)' }}
					animate={{
						opacity: [0, 1, 1, 0], // Passe de 0 à 1, reste à 1, puis revient à 0
						filter: ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)'], // Transition de flou pendant les changements
					}}
					transition={{
						duration: 10, // Durée totale (6s + 0.3s + 6s + 0.3s)
						times: [0, 0.0476, 0.5238, 0.5714], // Moments des transitions
						repeat: Infinity, // Répète l'animation indéfiniment
						ease: 'linear', // Transition linéaire pour un changement uniforme
						delay: 5,
					}}
				>
					<Image src={'/150.gif'} height={100} width={100} alt={'Mewtwo'} />
				</motion.div>

				<AnimatePresence>
					<motion.button
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						whileHover={{ scale: 1.05 }}
						exit={{
							opacity: 0,
							scale: 0.9,
							transition: {
								delay: 0.1,
							},
						}}
						transition={{ delay: 0.3, duration: 0.3 }}
						className="w-60 h-[135px] rounded-xl bg-red border-red-foreground border-4 flex flex-col justify-center items-center overflow-hidden"
						onClick={() => router.push('/pokedex')}
					>
						<div className="w-60 h-[150px] -mt-1 -mb-[90px] border rounded-xl">
							{resolvedTheme === 'dark' ? (
								<video
									className="rounded-xl border h-[140px]"
									key="black-video"
									ref={videoRef}
									src="/pokedex-black.mp4"
									muted
									playsInline
									onEnded={() => {
										if (videoRef.current) {
											videoRef.current.currentTime = 5;
										}
									}}
								/>
							) : (
								<video
									className="rounded-xl border"
									key="white-video"
									ref={videoRef}
									src="/pokedex-white.mp4"
									muted
									playsInline
									onEnded={() => {
										if (videoRef.current) {
											videoRef.current.currentTime = 5;
										}
									}}
								/>
							)}
						</div>
						<div className="h-20 w-20 flex justify-center items-center ">
							<Viewer />
						</div>
					</motion.button>
				</AnimatePresence>
				<motion.div
					className="my-10 -mb-20 ml-10 "
					initial={{ opacity: 0, filter: 'blur(10px)' }}
					animate={{
						opacity: [0, 1, 1, 0], // Passe de 0 à 1, reste à 1, puis revient à 0
						filter: ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)'], // Transition de flou pendant les changements
					}}
					transition={{
						duration: 10, // Durée totale (6s + 0.3s + 6s + 0.3s)
						times: [0, 0.0476, 0.5238, 0.5714], // Moments des transitions
						repeat: Infinity, // Répète l'animation indéfiniment
						ease: 'linear', // Transition linéaire pour un changement uniforme
					}}
				>
					<Image src={'/150.gif'} height={100} width={100} alt={'Mewtwo'} />
				</motion.div>
				<PikatchuRightToLeft />
			</div>
		</section>
	);
}
