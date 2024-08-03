'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Viewer from '@/components/model/viewer-pokeball';
import { ModeToggle } from '@/components/mode-toggle';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState, RefObject } from 'react';

export default function PokedexSection() {
	const router = useRouter();
	const { theme, resolvedTheme } = useTheme(); // Utilisez `resolvedTheme` pour obtenir le thème final appliqué
	const videoRef: RefObject<HTMLVideoElement> = useRef(null);
	const [hasPlayed, setHasPlayed] = useState(false);
	const [mounted, setMounted] = useState(false); // Pour vérifier si le composant est monté

	useEffect(() => {
		setMounted(true); // Marque le composant comme monté
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
			// Rejouer la vidéo si le thème change
			videoRef.current.pause();
			videoRef.current.load(); // Recharge la vidéo pour s'assurer que la vidéo correcte est jouée
			videoRef.current.play();
		}
	}, [resolvedTheme, mounted]); // Utilisation de `resolvedTheme` et `mounted`

	if (!mounted) return null; // Ne pas rendre le composant tant que le thème n'est pas appliqué

	return (
		<section className="relative w-full h-full flex justify-center items-center flex-col bg-primary max-w-7xl m-auto">
			<div className="absolute top-2 right-10 p-1">
				<ModeToggle />
			</div>

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
					className="absolute w-64  rounded-xl bg-red border-red-foreground border-4"
					onClick={() => router.push('/pokedex')}
				>
					<div className="w-60 -mb-20">
						{resolvedTheme === 'dark' ? (
							<video
								key="black-video" // key pour forcer le rechargement lorsque le thème change
								ref={videoRef}
								src="/pokedex-black.mp4"
								muted
								playsInline
								onEnded={() => {
									if (videoRef.current) {
										videoRef.current.currentTime = 5; // Optionnel : pour rejouer la vidéo si nécessaire
									}
								}}
							/>
						) : (
							<video
								key="white-video" // key pour forcer le rechargement lorsque le thème change
								ref={videoRef}
								src="/pokedex-white.mp4"
								muted
								playsInline
								onEnded={() => {
									if (videoRef.current) {
										videoRef.current.currentTime = 5; // Optionnel : pour rejouer la vidéo si nécessaire
									}
								}}
							/>
						)}
					</div>

					<Viewer />
				</motion.button>
			</AnimatePresence>
		</section>
	);
}
