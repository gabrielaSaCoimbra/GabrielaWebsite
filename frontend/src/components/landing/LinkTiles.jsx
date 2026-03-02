import { useEffect, useMemo, useState } from 'react';
import sanityClient from '../../lib/sanity.client';
import { WORKS_OVERVIEW_QUERY } from '../../lib/sanity.queries.js';
import { urlFor } from '../../lib/sanity.image.js';
import { Tile } from './Tile.jsx';

const ROUTE_BY_KEY = {
	ambient: '/projects?cat=ambient',
	architecture: '/projects?cat=architecture',
	product: '/projects?cat=product',
	exhibition: '/projects?cat=exhibition',
};

// label fallback por key
const LABEL_BY_KEY = {
	ambient: 'Ambient',
	architecture: 'Architecture',
	product: 'Product',
	exhibition: 'Exhibitions',
};

export function LinkTiles() {
	const [tiles, setTiles] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let alive = true;

		(async () => {
			try {
				const data = await sanityClient.fetch(WORKS_OVERVIEW_QUERY);
				const list = (data?.tiles || []).filter(t => t?.enabled !== false);

				if (alive) setTiles(list);
			} catch (err) {
				console.error('Failed to fetch worksOverview tiles', err);
			} finally {
				if (alive) setLoading(false);
			}
		})();

		return () => {
			alive = false;
		};
	}, []);

	// helper para encontrar tile por key
	const byKey = useMemo(() => {
		const map = new Map();
		tiles.forEach(t => map.set(t.key, t));
		return map;
	}, [tiles]);

	// opcional: skeleton simples
	if (loading) {
		return (
			<section className='pt-24'>
				<div className='grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24'>
					<div className='md:col-span-6 md:col-start-7'>
						<div className='aspect-[4/3] rounded-2xl bg-border/40' />
					</div>
					<div className='md:col-span-4 md:col-start-2 md:-mt-24'>
						<div className='aspect-[4/5] rounded-2xl bg-border/40' />
					</div>
					<div className='md:col-span-5 md:col-start-8 md:-mt-10'>
						<div className='aspect-[4/3] rounded-2xl bg-border/40' />
					</div>
					<div className='md:col-span-4 md:col-start-5 md:mt-4'>
						<div className='aspect-[3/4] rounded-2xl bg-border/40' />
					</div>
				</div>
			</section>
		);
	}

	// pega em cada secção pelo key (para manter posições fixas)
	const ambient = byKey.get('ambient');
	const architecture = byKey.get('architecture');
	const product = byKey.get('product');
	const exhibition = byKey.get('exhibition');

	// helper para gerar URL leve
	const img = (tile, width) => {
		if (!tile?.image) return '';
		return urlFor(tile.image).width(width).quality(70).auto('format').url();
	};

return (
	<section className=' px-[7rem] pb-[6rem] '>
		<div className='grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-12 '>
			{/* 1) LEFT / upper */}
			{architecture && (
				<div className='md:col-start-3 md:col-span-7 md:row-start-1'>
					<Tile to={ROUTE_BY_KEY.architecture} image={img(architecture, 1600)} label={architecture.title || LABEL_BY_KEY.architecture} />
				</div>
			)}

			{/* 2) RIGHT / top */}
			{product && (
				<div className='md:col-start-7 md:col-span-6 md:row-start-2'>
					<Tile to={ROUTE_BY_KEY.product} image={img(product, 1600)} label={product.title || LABEL_BY_KEY.product} />
				</div>
			)}

			{/* 3) CENTER-RIGHT / middle */}
			{exhibition && (
				<div className='md:col-start-1 md:col-span-7 md:row-start-3'>
					<Tile to={ROUTE_BY_KEY.exhibition} image={img(exhibition, 1600)} label={exhibition.title || LABEL_BY_KEY.exhibition} />
				</div>
			)}

			{/* 4) CENTER-LEFT / bottom */}
			{ambient && (
				<div className='md:col-start-4 md:col-span-6 md:row-start-4'>
					<Tile to={ROUTE_BY_KEY.ambient} image={img(ambient, 1600)} label={ambient.title || LABEL_BY_KEY.ambient} />
				</div>
			)}
		</div>
	</section>
);


}
