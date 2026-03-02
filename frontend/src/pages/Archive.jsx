import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useArchiveIndex } from '../hooks/useArchiveIndex';
import { urlFor } from '../lib/sanity.image';

function imgUrl(image, width) {
	if (!image) return '';
	return urlFor(image).width(width).quality(70).auto('format').url();
}

const CATEGORY_LABEL = {
	architecture: 'Architecture',
	product: 'Product',
	exhibition: 'Exhibitions',
	ambient: 'Ambient',
};

function ViewButton({ active, children, onClick }) {
	return (
		<button type='button' onClick={onClick} className={['glass-pill__item', active ? 'is-active' : ''].join(' ')} aria-current={active ? 'page' : undefined} disabled={active}>
			{children}
		</button>
	);
}

export function Archive() {
	const { data, loading } = useArchiveIndex();

	// default = grid
	const [view, setView] = useState('grid'); // 'grid' | 'list'
	const [activeId, setActiveId] = useState(null);

	const items = useMemo(() => {
		const ambientItems = (data.ambient || []).map(a => ({
			kind: 'ambient',
			id: a._id,
			title: a.title || '', // opcional
			year: a.year || null,
			category: 'ambient',
			tag: a.tag || 'Ambient',
			thumb: a.image,
			href: null, // sem link
		}));

		const projectItems = (data.projects || []).map(p => ({
			kind: 'project',
			id: p._id,
			title: p.title || '',
			year: p.year || null,
			category: p.category,
			tag: p.tag || CATEGORY_LABEL[p.category] || p.category,
			thumb: p.cover,
			href: p.slug?.current ? `/projects/${p.slug.current}` : null,
		}));

		// ordem: ano desc, depois createdAt já vem do query. Aqui só juntamos.
		return [...projectItems, ...ambientItems];
	}, [data]);

	const activeItem = useMemo(() => items.find(i => i.id === activeId) || null, [items, activeId]);

	return (
		<div className='container-page pt-[25vh] pb-[8rem] pr-[7rem] pl-[7rem]'>
			<div className='text-lead font-[600] pb-[3rem]'>Archive</div>

			{/* Toggle bottom */}
			<aside className='fixed bottom-[2rem] left-1/2 -translate-x-1/2 z-20'>
				<div className='glass-pill'>
					<ViewButton active={view === 'grid'} onClick={() => setView('grid')}>
						Grid
					</ViewButton>
					<ViewButton active={view === 'list'} onClick={() => setView('list')}>
						List
					</ViewButton>
				</div>
			</aside>

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
				<>
					{/* ===== GRID VIEW ===== */}
					{view === 'grid' ? (
						<motion.div className='columns-1 md:columns-2 lg:columns-4 [column-gap:2rem]'>
							<AnimatePresence initial={false}>
								{items.map(it => (
									<motion.div
										key={`${it.kind}-${it.id}`}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.22, ease: 'easeOut' }}
										className='mb-10 break-inside-avoid'
									>
										{it.href ? (
											<Link to={it.href} className='group block'>
												<div className='rounded-[1rem] overflow-hidden bg-border/20'>
													<img
														src={imgUrl(it.thumb, 2000)}
														alt={it.thumb?.alt || it.title || ''}
														className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]'
														loading='lazy'
														decoding='async'
													/>
												</div>
											</Link>
										) : (
											<div className='rounded-[1rem] overflow-hidden bg-border/20'>
												<img src={imgUrl(it.thumb, 2000)} alt={it.thumb?.alt || ''} className='w-full h-auto object-cover' loading='lazy' decoding='async' />
											</div>
										)}
									</motion.div>
								))}
							</AnimatePresence>
						</motion.div>
					) : (
						/* ===== LIST VIEW ===== */
						<div className='relative'>
							{/* Preview fixo (desktop) */}
							<div className='hidden lg:block fixed right-[7rem] top-[30vh] z-10 w-[380px] pointer-events-none'>
								<AnimatePresence mode='wait'>
									{activeItem?.thumb ? (
										<motion.div
											key={activeItem.id}
											initial={{ opacity: 0, y: 8, scale: 0.98 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={{ opacity: 0, y: -8, scale: 0.98 }}
											transition={{ duration: 0.18, ease: 'easeOut' }}
											className='rounded-[1rem] overflow-hidden bg-border '
										>
											<img src={imgUrl(activeItem.thumb, 1200)} alt='' className='w-full h-auto object-cover' loading='lazy' decoding='async' />
										</motion.div>
									) : null}
								</AnimatePresence>
							</div>

							<div className='border-t  border-black ' />

							{/* Rows */}
							<div className='divide-y   divide-black  '>
								{items.map(it => {
									const isActive = activeId === it.id;

									const RowInner = (
										<motion.div
											onMouseEnter={() => setActiveId(it.id)}
											onMouseLeave={() => setActiveId(null)}
											className='grid grid-cols-12 gap-6 py-4 items-center'
											animate={{ x: isActive ? 10 : 0 }}
											transition={{ duration: 0.18, ease: 'easeOut' }}
										>
											{/* Title */}
											<div className='col-span-7 text-nav font-[600] '>{it.title || ''}</div>

											{/* Category tag */}
											<div className='col-span-2 text-navLight opacity-80 '>{it.tag || CATEGORY_LABEL[it.category] || it.category}</div>

											{/* Year (blank allowed) */}
											<div className='col-span-3 text-navLight opacity-80 text-right'>{it.year ? it.year : ''}</div>

											{/* Mobile preview (só quando active) */}
											<div className='col-span-12 lg:hidden pt-4'>
												<AnimatePresence>
													{isActive ? (
														<motion.div
															initial={{ opacity: 0, height: 0 }}
															animate={{ opacity: 1, height: 'auto' }}
															exit={{ opacity: 0, height: 0 }}
															transition={{ duration: 0.18, ease: 'easeOut' }}
															className='rounded-[1rem] overflow-hidden '
														>
															<img src={imgUrl(it.thumb, 1400)} alt='' className='w-full h-auto object-cover' />
														</motion.div>
													) : null}
												</AnimatePresence>
											</div>
										</motion.div>
									);

									// Projects têm link, ambient não
									return it.href ? (
										<Link key={it.id} to={it.href} className='block'>
											{RowInner}
										</Link>
									) : (
										<div key={it.id}>{RowInner}</div>
									);
								})}
							</div>

							<div className='border-t  border-black ' />

							{/* espaço para não ficar tapado pelo preview fixo */}
							<div className='hidden lg:block h-10' />
						</div>
					)}
				</>
			)}
		</div>
	);
}
