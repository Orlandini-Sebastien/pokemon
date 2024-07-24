'use client';

import { useRouter } from 'next/navigation';

const Home = () => {
	const router = useRouter();
	return (
		<div>
			<div>Home</div>
			<div onClick={() => router.push('/pokedex')}>Pokedex</div>
		</div>
	);
};

export default Home;
