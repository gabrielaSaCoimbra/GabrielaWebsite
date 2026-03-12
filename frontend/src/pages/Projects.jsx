// src/pages/Projects.jsx
import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { useProjectsIndex } from '../hooks/useProjectsIndex';
import { urlFor } from '../lib/sanity.image';

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
	architecture: 'Architecture ',
	product: 'Product ',
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
	'artistic-collaborations': 'Focused on collaborative work with artists and curators in the development of spatial and object-based projects. Through 3D modelling and visualisation, I help translate artistic concepts into spatial proposals, exhibition layouts or object studies, allowing ideas to be tested, refined and understood before production.',
};

// Mapeia filtro (URL) -> categoria interna do Sanity (project.category)
const FILTER_TO_PROJECT_CATEGORY = {
	architecture: 'architecture',
	product: 'product',
	'artistic-collaborations': 'exhibition',
	// spatial-studies é ambient (não é project)
};

function FilterButton({ active, children, onClick }) {
	return (
		<button type='button' onClick={onClick} className={['glass-pill__item', active ? 'is-active' : ''].join(' ')} aria-current={active ? 'page' : undefined} disabled={active}>
			{children}
		</button>
	);
}

function imgUrl(image, width) {
	if (!image) return '';
	return urlFor(image).width(width).quality(70).auto('format').url();
}

function normalizeCat(value) {
	const v = String(value || '').toLowerCase();
	const ok = new Set(['all', 'architecture', 'product', 'spatial-studies', 'artistic-collaborations']);
	return ok.has(v) ? v : 'all';
}

export function Projects() {
	const { data, loading } = useProjectsIndex();

	// URL state (source of truth)
	const [searchParams, setSearchParams] = useSearchParams();
	const filter = normalizeCat(searchParams.get('cat') || 'all');

	const heading = HEADING_BY_FILTER[filter] || 'All Projects';
	const description = DESCRIPTION_BY_FILTER[filter] || '';

	const setFilter = next => {
		const cat = normalizeCat(next);
		if (cat === 'all') setSearchParams({}, { replace: true });
		else setSearchParams({ cat }, { replace: true });
	};

	const items = useMemo(() => {
		// Ambient items (Spatial studies) — vem de ambientItem (sem link)
		const ambientItems = (data.ambient || []).map(a => ({
			kind: 'ambient',
			id: a._id,
			image: a.image,
			title: a.title,
			year: a.year,
			tag: 'Spatial studies', // UI label
		}));

		// Projects (Architecture/Product/Exhibition)
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

		// architecture/product/artistic-collaborations -> filtra projects
		const cat = FILTER_TO_PROJECT_CATEGORY[filter];
		return projectItems.filter(p => p.category === cat);
	}, [data, filter]);

	return (
		<div className='container-page pt-[25vh] pb-[7rem] pr-[7rem] pl-[7rem]'>
			{/* Heading + description */}
			<div className='pb-[3rem]'>
				<div className='text-lead font-[600]'>{heading}</div>

				{description ? <div className='mt-4 max-w-[80ch] text-sm opacity-60'>{description}</div> : null}
			</div>

			<div className='relative'>
				{/* Filters (desktop) */}
				<aside className='hidden md:block fixed bottom-[2rem] left-1/2 -translate-x-1/2 z-20'>
					<div className='glass-pill'>
						{FILTERS.map(f => (
							<FilterButton key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
								{f.label}
							</FilterButton>
						))}
					</div>
				</aside>

				{/* Filters (mobile) */}
				<div className='md:hidden mb-6 flex gap-4 overflow-x-auto'>
					{FILTERS.map(f => (
						<button key={f.key} type='button' onClick={() => setFilter(f.key)} className={['whitespace-nowrap text-sm transition-opacity', filter === f.key ? 'opacity-100' : 'opacity-60'].join(' ')}>
							{f.label}
						</button>
					))}
				</div>

				{/* Content */}
				{loading ? (
					<div className='columns-1 md:columns-2 lg:columns-3 [column-gap:2rem]'>
						{Array.from({ length: 9 }).map((_, i) => (
							<div key={i} className='mb-10 break-inside-avoid'>
								<div className='bg-border/30 h-[280px]' />
								<div className='mt-3 h-4 w-40 bg-border/30 rounded' />
							</div>
						))}
					</div>
				) : (
					<motion.div className='columns-1 md:columns-2 lg:columns-3 [column-gap:3rem]'>
						<AnimatePresence initial={false}>
							{items.map(it => {
								const key = `${it.kind}-${it.id}`;

								// Spatial studies (ambient) — sem link
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
											<div className='overflow-hidden bg-border/20'>
												<img src={imgUrl(it.image, 1800)} alt={it.image?.alt || it.title || ''} className='w-full h-auto object-cover' loading='lazy' decoding='async' />
											</div>

											{it.title ? <div className='mt-4 text-nav opacity-90 font-[600]'>{it.title}</div> : null}

											<div className={it.title ? 'mt-1 text-sm opacity-60' : 'mt-4 text-sm opacity-60'}>{it.tag}</div>
										</motion.div>
									);
								}

								// Projects — link + title + tag
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
											<div className='overflow-hidden bg-border/20'>
												<img
													src={imgUrl(it.cover, 2000)}
													alt={it.cover?.alt || it.title || ''}
													className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]'
													loading='lazy'
													decoding='async'
												/>
											</div>

											<div className='mt-4 text-nav opacity-90 font-[600]'>{it.title}</div>
											<div className='mt-1 text-sm opacity-60'>{it.tag}</div>
										</Link>
									</motion.div>
								);
							})}
						</AnimatePresence>
					</motion.div>
				)}
			</div>
		</div>
	);
}
