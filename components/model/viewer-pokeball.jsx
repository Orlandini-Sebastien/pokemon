import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Model } from './model-pokeball';

export default function ViewerPokeball() {
	const ref = useRef();
	return (
		<Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
			<Suspense fallback={null}>
				<Stage
					controls={ref}
					preset="rembrandt"
					intensity={1}
					environment="city"
					shadows={false}
				>
					false
					<Model />
					false
				</Stage>
			</Suspense>
			<OrbitControls ref={ref} autoRotate />
		</Canvas>
	);
}
