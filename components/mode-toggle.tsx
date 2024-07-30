'use client';

import * as React from 'react';
import { Disc, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

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
			className="relative h-10 w-24 rounded-full border flex items-center justify-between px-1"
		>
			<Sun className="h-8 w-8 p-1 box-border border rounded-full " />
			<Moon className="h-8 w-8 p-1 box-border border rounded-full" />
			<motion.div
				className="absolute h-8 w-8  rounded-full"
				initial={false}
				animate={{
					x: !isDark ? '54px' : '0px',
					backgroundColor: !isDark ? '#383838' : '#F5F5F5',
				}}
				transition={{ type: 'spring', stiffness: 300, damping: 30 }}
			/>
		</div>
	);
}
