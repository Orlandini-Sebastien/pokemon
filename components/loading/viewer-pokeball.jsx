import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Model } from './loading';

const ViewerLoading = () => {
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
					<Model />
				</Stage>
			</Suspense>
			<OrbitControls ref={ref} autoRotate />
		</Canvas>
	);
};

export default ViewerLoading;
