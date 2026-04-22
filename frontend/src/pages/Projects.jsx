import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatedPAfterH1 } from '../components/AnimatedText';
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

function FilterButton({ active, children, onClick }) {
	return (
		<button
			type='button'
			onClick={onClick}
			className={[
				'bg-[rgba(0,0,0,0.04)] backdrop-blur-[50px] px-6 py-3 text-nav transition duration-500',
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

function sortByYearDesc(a, b) {
	const yearA = Number(a.year) || 0;
	const yearB = Number(b.year) || 0;

	if (yearB !== yearA) return yearB - yearA;

	return String(b.id).localeCompare(String(a.id));
}

export function Projects() {
	const { data, loading } = useProjectsIndex();

	const [lbOpen, setLbOpen] = useState(false);
	const [lbIndex, setLbIndex] = useState(0);

	const [searchParams, setSearchParams] = useSearchParams();
	const filter = normalizeCat(searchParams.get('cat') || 'all');

	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const mobileFiltersRef = useRef(null);

	const heading = HEADING_BY_FILTER[filter] || 'All Projects';
	const description = DESCRIPTION_BY_FILTER[filter] || '';
	const activeFilterLabel = FILTERS.find(f => f.key === filter)?.label || 'All';
	const mobileActiveFilterLabel = filter === 'all' ? 'All categories' : activeFilterLabel;

	const setFilter = next => {
		const cat = normalizeCat(next);
		if (cat === filter) {
			setMobileFiltersOpen(false);
			return;
		}

		if (cat === 'all') setSearchParams({}, { replace: true });
		else setSearchParams({ cat }, { replace: true });

		setMobileFiltersOpen(false);
	};

	useEffect(() => {
		const onPointerDown = e => {
			const el = mobileFiltersRef.current;
			if (!el) return;
			if (el.contains(e.target)) return;
			setMobileFiltersOpen(false);
		};

		if (mobileFiltersOpen) {
			window.addEventListener('pointerdown', onPointerDown);
		}

		return () => window.removeEventListener('pointerdown', onPointerDown);
	}, [mobileFiltersOpen]);

	useEffect(() => {
		setMobileFiltersOpen(false);
	}, [filter]);

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

	const allItems = useMemo(() => {
		const ambientItems = (data.ambient || []).map(a => ({
			kind: 'ambient',
			id: a._id,
			title: a.title || '',
			year: a.year || null,
			tag: 'Spatial studies',
			filterKey: 'spatial-studies',
			image: a.image,
		}));

		const projectItems = (data.projects || []).map(p => ({
			kind: 'project',
			id: p._id,
			title: p.title || '',
			year: p.year || null,
			tag: p.category === 'exhibition' ? 'Artistic collaborations' : p.tag,
			filterKey: p.category === 'architecture' ? 'architecture' : p.category === 'product' ? 'product' : p.category === 'exhibition' ? 'artistic-collaborations' : null,
			slug: p.slug?.current,
			cover: p.cover,
		}));

		return [...projectItems, ...ambientItems].sort(sortByYearDesc);
	}, [data]);

	const items = useMemo(() => {
		if (filter === 'all') return allItems;
		return allItems.filter(item => item.filterKey === filter);
	}, [allItems, filter]);

	const total = loading ? null : items.length;
	const mobileFilterOptions = FILTERS.filter(f => f.key !== filter);

	return (
		<div className='pt-[15vh] md:pt-[25vh] pb-[4rem] md:pb-[6rem] md:px-[7rem] px-6'>
			<div className='mb-[3rem] lg:mb-[4rem] flex flex-col gap-5 justify-center items-center'>
				<div className='text-lead font-[600] text-black/80'>
					{heading} {total !== null ? <span className='text-black/40'>{total}</span> : null}
				</div>

				{description ? <div className='max-w-[75ch] text-sm'>{description}</div> : null}

				<div className='hidden md:block mt-6'>
					<div className='flex gap-2'>
						{FILTERS.map(f => (
							<FilterButton key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
								{f.label}
							</FilterButton>
						))}
					</div>
				</div>
			</div>

			<div className='relative'>
				<div className='md:hidden fixed bottom-3 right-6 left-6 z-30'>
					<motion.div
						ref={mobileFiltersRef}
						initial={false}
						animate={mobileFiltersOpen ? 'open' : 'closed'}
						className='pointer-events-auto w-full overflow-hidden bg-[rgba(0,0,0,0.04)] backdrop-blur-[50px]'
						variants={{
							closed: { height: 44 },
							open: { height: 44 + mobileFilterOptions.length * 37.5 },
						}}
						transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
					>
						<button
							type='button'
							onClick={() => setMobileFiltersOpen(v => !v)}
							aria-expanded={mobileFiltersOpen}
							aria-label={mobileFiltersOpen ? 'Close filters' : 'Open filters'}
							className='h-11 w-full px-5 flex items-center justify-between text-nav text-black/80'
						>
							<span>
								<span>{mobileActiveFilterLabel}</span>
							</span>

							<div className='relative h-4 w-4'>
								<motion.span className='absolute top-1/2 left-0 block h-[1.5px] w-4 bg-black/80' style={{ y: '-50%' }} />
								<motion.span
									className='absolute top-1/2 left-0 block h-[1.5px] w-4 bg-black/80'
									style={{ y: '-50%' }}
									animate={{ rotate: mobileFiltersOpen ? 0 : 90 }}
									transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
								/>
							</div>
						</button>

						<AnimatePresence initial={false}>
							{mobileFiltersOpen && (
								<motion.div key='mobile-filters' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: 'easeOut' }} className='px-4 pb-4'>
									<div className='flex flex-col items-start'>
										{mobileFilterOptions.map(f => (
											<button key={f.key} type='button' onClick={() => setFilter(f.key)} className='w-full py-2 text-center text-nav text-black/80'>
												{f.label}
											</button>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
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
					<motion.div
						key={filter}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
						className='columns-1 md:columns-2 lg:columns-3 md:[column-gap:2rem]'
					>
						{items.map(it => {
							const key = `${it.kind}-${it.id}`;

							if (it.kind === 'ambient') {
								return (
									<motion.div
										key={key}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.22, ease: 'easeOut' }}
										className='mb-6 md:mb-10 break-inside-avoid'
									>
										<button type='button' onClick={() => openAmbient(it.id)} className='overflow-hidden group block w-full text-left' aria-label='Open image'>
											<SanityImage
												image={it.image}
												preset='card'
												alt={it.image?.alt || it.title || ''}
												className='w-full'
												imgClassName='w-full h-auto object-cover transition-transform duration-[500ms] group-hover:scale-[1.02]'
												sizes='(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw'
											/>
										</button>

										{it.title ? (
											<div>
												<AnimatedPAfterH1 className='hidden lg:block mt-4 text-nav font-[600]'>{it.title}</AnimatedPAfterH1>
												<div className='lg:hidden block mt-4 text-nav font-[600]'>{it.title}</div>
											</div>
										) : null}
										<div>
											<AnimatedPAfterH1 className={it.title ? 'md:mt-1 text-sm' : 'mt-4 text-sm'}>{it.tag}</AnimatedPAfterH1>
										</div>
									</motion.div>
								);
							}

							const href = it.slug ? `/projects/${it.slug}` : '/projects';

							return (
								<motion.div
									key={key}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.22, ease: 'easeOut' }}
									className='mb-6 md:mb-10 break-inside-avoid'
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

										<AnimatedPAfterH1 className='hidden lg:block mt-4 text-nav font-[600]'>{it.title}</AnimatedPAfterH1>
										<div className='lg:hidden block mt-4 text-nav font-[600]'>{it.title}</div>

										<AnimatedPAfterH1 className='hidden lg:block md:mt-1 text-sm'>{it.tag}</AnimatedPAfterH1>
										<div className='block lg:hidden md:mt-1 text-sm'>{it.tag}</div>
									</Link>
								</motion.div>
							);
						})}
					</motion.div>
				)}
			</div>

			<Lightbox open={lbOpen} onClose={() => setLbOpen(false)} images={ambientLbImages} index={lbIndex} onPrev={prevAmbient} onNext={nextAmbient} />
		</div>
	);
}
