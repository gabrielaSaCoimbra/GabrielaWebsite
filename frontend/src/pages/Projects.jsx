import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { useProjectsIndex } from '../hooks/useProjectsIndex';
import { urlFor } from '../lib/sanity.image';

const FILTERS = [
	{ key: 'all', label: 'All' },
	{ key: 'architecture', label: 'Architecture' },
	{ key: 'product', label: 'Product' },
	{ key: 'ambient', label: 'Ambient' },
	{ key: 'exhibition', label: 'Exhibitions' },
];



const HEADING_BY_FILTER = {
	all: 'All Projects',
	architecture: 'Architecture Projects',
	product: 'Product Projects',
	ambient: 'Ambient Projects',
	exhibition: 'Exhibition Projects',
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
	const ok = new Set(['all', 'architecture', 'product', 'ambient', 'exhibition']);
	return ok.has(v) ? v : 'all';
}

export function Projects() {
	const { data, loading } = useProjectsIndex();
	const [searchParams, setSearchParams] = useSearchParams();
	const filter = normalizeCat(searchParams.get('cat') || 'all');
	const heading = HEADING_BY_FILTER[filter] || 'All Projects';

	const setFilter = next => {
		const cat = normalizeCat(next);
		if (cat === 'all') {
			setSearchParams({}, { replace: true });
		} else {
			setSearchParams({ cat }, { replace: true });
		}
	};

	const items = useMemo(() => {
		const ambientItems = (data.ambient || []).map(a => ({
			kind: 'ambient',
			id: a._id,
			image: a.image, 
			title: a.title, 
			year: a.year, 
			tag: a.tag, 
		}));

		const projectItems = (data.projects || []).map(p => ({
			kind: 'project',
			id: p._id,
			category: p.category,
			title: p.title,
			slug: p.slug?.current,
			cover: p.cover,
			tag: p.tag,
		}));

		if (filter === 'all') return [...projectItems, ...ambientItems];
		if (filter === 'ambient') return ambientItems;
		return projectItems.filter(p => p.category === filter);
	}, [data, filter]);

	return (
		<div className='container-page pt-[25vh] pb-[7rem] pr-[7rem] pl-[7rem]'>
			<div className='text-lead font-[600] pb-[3rem]'>{heading}</div>
			<div className='relative'>
				<aside className='hidden md:block fixed bottom-[2rem] left-1/2 -translate-x-1/2 z-20'>
					<div className='glass-pill'>
						{FILTERS.map(f => (
							<FilterButton key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
								{f.label}
							</FilterButton>
						))}
					</div>
				</aside>

				{/* mobile */}
				<div className='md:hidden mb-6 flex gap-4 overflow-x-auto'>
					{FILTERS.map(f => (
						<button key={f.key} type='button' onClick={() => setFilter(f.key)} className={['whitespace-nowrap text-sm transition-opacity', filter === f.key ? 'opacity-100' : 'opacity-60'].join(' ')}>
							{f.label}
						</button>
					))}
				</div>

				{loading ? (
					<div className='columns-1 md:columns-2 lg:columns-3 [column-gap:2rem]'>
						{Array.from({ length: 9 }).map((_, i) => (
							<div key={i} className='mb-10 break-inside-avoid'>
								<div className='bg-border/30 rounded-[1rem] h-[280px]' />
								<div className='mt-3 h-4 w-40 bg-border/30 rounded' />
							</div>
						))}
					</div>
				) : (
					<motion.div className='columns-1 md:columns-2 lg:columns-3 [column-gap:2rem]'>
						<AnimatePresence initial={false}>
							{items.map(it => {
								const key = `${it.kind}-${it.id}`;

								// Ambient (sem link, sem título)
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
											<div className='rounded-[1rem] overflow-hidden bg-border/20'>
												<img src={imgUrl(it.image, 1800)} alt={it.image?.alt || ''} className='w-full h-auto object-cover' loading='lazy' decoding='async' />
											</div>

											{it.title ? <div className='mt-4 text-nav opacity-90 font-[600]'>{it.title}</div> : null}
											<div className='mt-1 text-sm opacity-60'>{it.tag}</div>
										</motion.div>
									);
								}

								// Project (link + título + tag)
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
											<div className='rounded-[1rem] overflow-hidden bg-border/20'>
												<img
													src={imgUrl(it.cover, 2000)}
													alt={it.cover?.alt || it.title || ''}
													className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]'
													loading='lazy'
													decoding='async'
												/>
											</div>

											<div className='mt-4 text-nav opacity-90 font-[600]'>{it.title}</div>
											<div className='mt-1 text-sm '>{it.tag}</div>
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
