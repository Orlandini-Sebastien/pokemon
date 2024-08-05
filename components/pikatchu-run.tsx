import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Composant pour Pikachu allant de gauche à droite
const PikatchuLeftToRight = () => {
	return (
		<motion.section
			className={'flex'}
			style={{ position: 'relative', width: '100vw', height: '100px' }}
			animate={{
				x: ['0%', '100%'], // Animation de gauche à droite
			}}
			transition={{
				duration: 4, // Durée de l'animation
				ease: 'linear', // Animation linéaire pour un mouvement constant
				repeat: Infinity,
				repeatDelay: 6,
			}}
		>
			<Image
				src={'/pikatchu_run.gif'} // Image pour gauche à droite
				height={50}
				width={50}
				alt={'pikatchu'}
				className="object-contain"
			/>
		</motion.section>
	);
};

// Composant pour Pikachu allant de droite à gauche
const PikatchuRightToLeft = () => {
	return (
		<motion.section
			className="flex "
			style={{ position: 'relative', width: '100vw', height: '100px' }}
			animate={{
				x: ['100%', '-15%'], // Animation de droite à gauche
			}}
			transition={{
				duration: 4, // Durée de l'animation
				ease: 'linear', // Animation linéaire pour un mouvement constant
				repeat: Infinity,
				repeatDelay: 6,
				delay: 5,
			}}
		>
			<Image
				src={'/pikatchu_run.gif'} // Image pour droite à gauche
				height={50}
				width={50}
				alt={'pikatchu'}
				className={'rotate-y-180 object-contain'}
			/>
		</motion.section>
	);
};

// Export des deux composants
export { PikatchuLeftToRight, PikatchuRightToLeft };
