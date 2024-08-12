import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function Model(props) {
	const groupRef = useRef();
	const { nodes, materials } = useGLTF('/pokeball.glb');

	// Utilisation de useFrame pour animer la rotation
	useFrame(() => {
		if (groupRef.current) {
			// Augmenter la vitesse de rotation ici
			groupRef.current.rotation.y += 0.07; // Changez la valeur pour ajuster la vitesse
		}
	});

	return (
		<group {...props} dispose={null} ref={groupRef}>
			<group position={[-0.1, 0.018, 0.009]} rotation={[-1.453, 0, 0]}>
				<mesh
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
