'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function ModeToggle() {
	const { setTheme, theme } = useTheme();
	const isDark = theme === 'dark';

	return (
		<div
			onClick={() => {
				if (theme === 'light' || theme === 'system') {
					setTheme('dark');
				} else {
					setTheme('light');
				}
			}}
			className="relative h-10 w-24 rounded-full border-4 box-content flex items-center justify-between px-1 hover:cursor-pointer bg-red border-red-foreground"
		>
			<div className="h-[33px] w-[33px] rounded-full">
				<Image
					width={600}
					height={600}
					alt="light"
					src={'/solaroc.png'}
					className="rounded-full object-contain"
				/>
			</div>

			<div className="h-[28px] w-[28px]  rounded-full">
				<Image
					width={600}
					height={600}
					alt="light"
					src={'/seleroc.png'}
					className="rounded-full object-contain"
				/>
			</div>
			<motion.div
				className="absolute h-8 w-8  rounded-full border-none"
				initial={false}
				animate={{
					x: !isDark ? '64px' : '0px',

					rotate: !isDark ? 0 : -360,
				}}
				transition={{ type: 'spring', stiffness: 300, damping: 30 }}
			>
				<Image
					className="rounded-full"
					src={'/pokeball-toggle.png'}
					alt="pokeball"
					fill
				/>
			</motion.div>
		</div>
	);
}
