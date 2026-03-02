import { HeroGallery } from '../components/landing/HeroGallery.jsx';
import { IntroRow } from '../components/landing/IntroRow.jsx';
import { LinkTiles } from '../components/landing/LinkTiles.jsx';

export function Home() {
	return (
		<>
			<HeroGallery />
			<IntroRow />
			<LinkTiles />
		</>
	);
}
