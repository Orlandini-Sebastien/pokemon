'use client';

import { useRouter } from 'next/navigation';
import Test from './test/page';

const Home = () => {
	const router = useRouter();
	return (
		<section>
			<Test />
		</section>
	);
};

export default Home;
