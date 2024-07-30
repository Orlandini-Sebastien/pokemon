import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
	const { nodes, materials } = useGLTF('/pokeball.glb');
	return (
		<group {...props} dispose={null}>
			<group position={[0, 0.018, 0.009]} rotation={[-1.453, 0, 0]}>
				<mesh
					//   castShadow
					//   receiveShadow
					geometry={nodes.Sphere003_0.geometry}
					material={materials['Material.001']}
					position={[0.159, -0.144, -0.071]}
					rotation={[0, 0, -Math.PI]}
				/>
			</group>
		</group>
	);
}

useGLTF.preload('/pokeball.glb');
