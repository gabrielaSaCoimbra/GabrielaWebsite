import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { useProjectsIndex } from '../hooks/useProjectsIndex';
import { imageUrl } from '../lib/sanity.image';
import { SanityImage } from '../components/SanityImage';
import { Lightbox } from '../components/Lightbox';

// UI keys (URL)
const FILTERS = [
	{ key: 'all', label: 'All' },
	{ key: 'architecture', label: 'Architecture' },
	{ key: 'product', label: 'Product' },
	{ key: 'spatial-studies', label: 'Spatial studies' },
	{ key: 'artistic-collaborations', label: 'Artistic collaborations' },
];

// Heading por filtro (UI)
const HEADING_BY_FILTER = {
	all: 'All Projects',
	architecture: 'Architecture',
	product: 'Product',
	'spatial-studies': 'Spatial studies',
	'artistic-collaborations': 'Artistic collaborations',
};

// Texto por filtro (sem texto no "all")
const DESCRIPTION_BY_FILTER = {
	architecture:
		'My focus is on the interpretation and spatial translation of architectural and interior design projects. Through precise modelling, material definition and light calibration, I develop photorealistic visualisations that communicate design intent clearly to clients and collaborators.',
	product:
		'I am dedicated to product and furniture design visualisation. I produce high-quality, real-to-life images for client presentations and marketing purposes, as well as detailed 3D models and technical drawings to support production and manufacturing processes.',
	'spatial-studies':
		'An ongoing research area where I explore spatial conception beyond predefined briefs. Through speculative 3D environments, I investigate perception, atmosphere and material behaviour, using digital modelling as a laboratory for experimentation and spatial refinement.',
	'artistic-collaborations':
		'Focused on collaborative work with artists and curators in the development of spatial and object-based projects. Through 3D modelling and visualisation, I help translate artistic concepts into spatial proposals, exhibition layouts or object studies, allowing ideas to be tested, refined and understood before production.',
};

// Mapeia filtro (URL) -> categoria interna do Sanity (project.category)
const FILTER_TO_PROJECT_CATEGORY = {
	architecture: 'architecture',
	product: 'product',
	'artistic-collaborations': 'exhibition',
	// spatial-studies = ambient
};

function FilterButton({ active, children, onClick }) {
	return (
		<button
			type='button'
			onClick={onClick}
			className={[
				'bg-[rgba(0,0,0,0.04)] backdrop-blur-[50px] px-4 py-3 text-nav transition duration-500',
				active ? 'text-black bg-[rgba(0,0,0,0.1)]' : 'text-black/60 hover:text-black hover:bg-[rgba(0,0,0,0.1)]',
			].join(' ')}
			disabled={active}
		>
			{children}
		</button>
	);
}

function normalizeCat(value) {
	const v = String(value || '').toLowerCase();
	const ok = new Set(['all', 'architecture', 'product', 'spatial-studies', 'artistic-collaborations']);
	return ok.has(v) ? v : 'all';
}

export function Projects() {
	const { data, loading } = useProjectsIndex();

	// Lightbox (só ambient)
	const [lbOpen, setLbOpen] = useState(false);
	const [lbIndex, setLbIndex] = useState(0);

	// URL filter
	const [searchParams, setSearchParams] = useSearchParams();
	const filter = normalizeCat(searchParams.get('cat') || 'all');

	const heading = HEADING_BY_FILTER[filter] || 'All Projects';
	const description = DESCRIPTION_BY_FILTER[filter] || '';

	const setFilter = next => {
		const cat = normalizeCat(next);
		if (cat === 'all') setSearchParams({}, { replace: true });
		else setSearchParams({ cat }, { replace: true });
	};

	const ambientLbImages = useMemo(() => {
		return (data.ambient || []).map(a => ({
			src: imageUrl(a.image, 'lightbox'),
			alt: a.image?.alt || a.title || '',
		}));
	}, [data.ambient]);

	const ambientIndexById = useMemo(() => {
		const map = new Map();
		(data.ambient || []).forEach((a, idx) => map.set(a._id, idx));
		return map;
	}, [data.ambient]);

	const openAmbient = ambientId => {
		const idx = ambientIndexById.get(ambientId);
		if (idx === undefined) return;
		setLbIndex(idx);
		setLbOpen(true);
	};

	const prevAmbient = () => setLbIndex(i => (i - 1 + ambientLbImages.length) % ambientLbImages.length);
	const nextAmbient = () => setLbIndex(i => (i + 1) % ambientLbImages.length);

	const items = useMemo(() => {
		const ambientItems = (data.ambient || []).map(a => ({
			kind: 'ambient',
			id: a._id,
			image: a.image,
			title: a.title,
			year: a.year,
			tag: 'Spatial studies',
		}));

		const projectItems = (data.projects || []).map(p => ({
			kind: 'project',
			id: p._id,
			category: p.category, // architecture | product | exhibition
			title: p.title,
			slug: p.slug?.current,
			cover: p.cover,
			tag: p.category === 'exhibition' ? 'Artistic collaborations' : p.tag,
		}));

		if (filter === 'all') return [...projectItems, ...ambientItems];

		if (filter === 'spatial-studies') return ambientItems;

		const cat = FILTER_TO_PROJECT_CATEGORY[filter];
		return projectItems.filter(p => p.category === cat);
	}, [data, filter]);

	return (
		<div className='pt-[17vh] pb-[7rem] pr-[7rem] pl-[7rem]'>
			{/* Heading + description */}
			<div className='mb-[3.5rem] flex flex-col gap-4 justify-center items-center'>
				<div className='text-lead font-[600] text-black/80'>{heading}</div>

				{description ? <div className='max-w-[80ch] text-sm'>{description}</div> : null}
			</div>

			<div className='relative'>
				<aside className='hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-20'>
					<div className='flex gap-2'>
						{FILTERS.map(f => (
							<FilterButton key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
								{f.label}
							</FilterButton>
						))}
					</div>
				</aside>

				<div className='md:hidden mb-8 flex gap-4 overflow-x-auto'>
					{FILTERS.map(f => (
						<button key={f.key} type='button' onClick={() => setFilter(f.key)} className={['whitespace-nowrap text-sm transition-opacity', filter === f.key ? 'opacity-100' : 'opacity-10'].join(' ')}>
							{f.label}
						</button>
					))}
				</div>

				{loading ? (
					<div className='columns-1 md:columns-2 lg:columns-3 [column-gap:3rem]'>
						{[320, 420, 280, 380, 500, 340, 460, 300, 390].map((h, i) => (
							<div key={i} className='mb-10 break-inside-avoid'>
								<div className='bg-[rgba(0,0,0,0.04)]' style={{ height: `${h}px` }} />
								<div className='mt-4 h-4 w-40 bg-[rgba(0,0,0,0.04)]' />
								<div className='mt-2 h-3 w-24 bg-[rgba(0,0,0,0.04)]' />
							</div>
						))}
					</div>
				) : (
					<motion.div className='columns-1 md:columns-2 lg:columns-3 [column-gap:3rem]'>
						<AnimatePresence initial={false}>
							{items.map(it => {
								const key = `${it.kind}-${it.id}`;

								// Spatial studies (ambient) — abre lightbox
								if (it.kind === 'ambient') {
									return (
										<motion.div
											key={key}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{ duration: 0.25, ease: 'easeOut' }}
											className='mb-10 break-inside-avoid'
										>
											<button type='button' onClick={() => openAmbient(it.id)} className='overflow-hidden bg-border/20 block w-full text-left' aria-label='Open image'>
												<SanityImage
													image={it.image}
													preset='card'
													alt={it.image?.alt || it.title || ''}
													className='w-full'
													imgClassName='w-full h-auto object-cover'
													sizes='(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw'
												/>
											</button>

											{it.title ? <div className='mt-4 text-nav font-[600]'>{it.title}</div> : null}
											<div className={it.title ? 'mt-1 text-sm' : 'mt-4 text-sm'}>{it.tag}</div>
										</motion.div>
									);
								}

								// Projects — link normal
								const href = it.slug ? `/projects/${it.slug}` : '/projects';

								return (
									<motion.div
										key={key}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.25, ease: 'easeOut' }}
										className='mb-10 break-inside-avoid'
									>
										<Link to={href} className='group block'>
											<div className='overflow-hidden'>
												<SanityImage
													image={it.cover}
													preset='card'
													alt={it.cover?.alt || it.title || ''}
													className='w-full'
													imgClassName='w-full h-auto object-cover transition-transform duration-[500ms] group-hover:scale-[1.02]'
													sizes='(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw'
												/>
											</div>

											<div className='mt-4 text-nav font-[600]'>{it.title}</div>
											<div className='mt-1 text-sm'>{it.tag}</div>
										</Link>
									</motion.div>
								);
							})}
						</AnimatePresence>
					</motion.div>
				)}
			</div>

			{/* Lightbox (ambient only) */}
			<Lightbox open={lbOpen} onClose={() => setLbOpen(false)} images={ambientLbImages} index={lbIndex} onPrev={prevAmbient} onNext={nextAmbient} />
		</div>
	);
}
