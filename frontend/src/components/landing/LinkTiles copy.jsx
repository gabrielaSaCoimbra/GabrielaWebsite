import { useEffect, useMemo, useState } from 'react';
import sanityClient from '../../lib/sanity.client';
import { WORKS_OVERVIEW_QUERY } from '../../lib/sanity.queries.js';
import { urlFor } from '../../lib/sanity.image.js';
import { Tile } from './Tile.jsx';

// rota por key (ajusta se as tuas rotas forem diferentes)
const ROUTE_BY_KEY = {
	ambient: '/ambient', // ou '/works/ambient'
	architecture: '/architecture', // ou '/works/architecture'
	product: '/product',
	exhibition: '/exhibition',
};

// label fallback por key
const LABEL_BY_KEY = {
	ambient: 'AMBIENT',
	architecture: 'ARCHITECTURE',
	product: 'PRODUCT',
	exhibition: 'EXHIBITIONS',
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
		<section className='mx-[10rem]  pt-24'>
			<div className='relative'>
				<div className='grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24 '>
					{/* (top right) ARCHITECTURE */}
					{architecture && (
						<div className='md:col-span-7 md:col-start-6 '>
							<div >
								<Tile to={ROUTE_BY_KEY.architecture} image={img(architecture, 1600)} label={architecture.title || LABEL_BY_KEY.architecture} className='h-full' />
							</div>
						</div>
					)}

					{/* (left) PRODUCT */}
					{product && (
						<div className='md:col-span-6 md:mt-2'>
							<div>
								<Tile to={ROUTE_BY_KEY.product} image={img(product, 1200)} label={product.title || LABEL_BY_KEY.product} className='h-full' />
							</div>
						</div>
					)}

					{/* (right) EXHIBITION */}
					{exhibition && (
						<div className='md:col-span-7 md:col-start-6 md:mt-1 '>
							<div>
								<Tile to={ROUTE_BY_KEY.exhibition} image={img(exhibition, 1400)} label={exhibition.title || LABEL_BY_KEY.exhibition} className='h-full' />
							</div>
						</div>
					)}

					{/* (center bottom) AMBIENT */}
					{ambient && (
						<div className='md:col-span-6 md:col-start-4 md:mt-4 '>
							<div >
								<Tile to={ROUTE_BY_KEY.ambient} image={img(ambient, 1200)} label={ambient.title || LABEL_BY_KEY.ambient} className='h-full' />
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
