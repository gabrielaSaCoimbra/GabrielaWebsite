import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useArchiveIndex } from '../hooks/useArchiveIndex';
import { urlFor } from '../lib/sanity.image';
import GridViewIcon3 from '../components/Icons/GridViewIcon3';
import GridViewIcon4 from '../components/Icons/GridViewIcon4';
import ListViewIcon from '../components/Icons/ListViewIcon';

function imgUrl(image, width) {
	if (!image) return '';
	return urlFor(image).width(width).quality(70).auto('format').url();
}

const CATEGORY_LABEL = {
	architecture: 'Architecture',
	product: 'Product',
	exhibition: 'Artistic collaborations',
	ambient: 'Spatial studies',
};

function ViewButton({ active, children, onClick, label }) {
	return (
		<button
			type='button'
			onClick={onClick}
			aria-label={label}
			className={['bg-[rgba(0,0,0,0.04)] backdrop-blur-[50px] px-4 py-3 text-nav transition duration-500', active ? 'text-black' : 'text-black/60 hover:text-black hover:bg-[rgba(0,0,0,0.1)]'].join(
				' ',
			)}
			disabled={active}
		>
			{children}
		</button>
	);
}

export function Archive() {
	const { data, loading } = useArchiveIndex();

	const [view, setView] = useState('grid3'); 
	const [activeId, setActiveId] = useState(null);

	const items = useMemo(() => {
		const ambientItems = (data.ambient || []).map(a => ({
			kind: 'ambient',
			id: a._id,
			title: a.title || '',
			year: a.year || null,
			category: 'ambient',
			tag: 'Spatial studies',
			thumb: a.image,
			href: null,
		}));

		const projectItems = (data.projects || []).map(p => ({
			kind: 'project',
			id: p._id,
			title: p.title || '',
			year: p.year || null,
			category: p.category,
			tag: p.category === 'exhibition' ? 'Artistic collaborations' : p.tag || CATEGORY_LABEL[p.category] || p.category,
			thumb: p.cover,
			href: p.slug?.current ? `/projects/${p.slug.current}` : null,
		}));

		return [...projectItems, ...ambientItems];
	}, [data]);

	const activeItem = useMemo(() => items.find(i => i.id === activeId) || null, [items, activeId]);

	// classes do grid conforme o toggle
	const gridColsClass = view === 'grid3' ? 'columns-1 md:columns-2 lg:columns-3 [column-gap:3rem]' : 'columns-1 md:columns-2 lg:columns-4 [column-gap:3rem]';

	return (
		<div className='pt-[17vh] pb-[8rem] pr-[7rem] pl-[7rem]'>
			{/* Toggle bottom */}
			<aside className='fixed bottom-6 left-1/2 -translate-x-1/2 z-20'>
				<div className='flex gap-2'>
					<ViewButton label='Grid 3 columns' active={view === 'grid3'} onClick={() => setView('grid3')}>
						<GridViewIcon3 size={22} color='currentColor' />
					</ViewButton>

					<ViewButton label='Grid 4 columns' active={view === 'grid4'} onClick={() => setView('grid4')}>
						<GridViewIcon4 size={22} color='currentColor' />
					</ViewButton>

					<ViewButton label='List view' active={view === 'list'} onClick={() => setView('list')}>
						<ListViewIcon size={22} color='currentColor' />
					</ViewButton>
				</div>
			</aside>

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
				<>
					{/* ===== GRID VIEW (3 ou 4 colunas) ===== */}
					{view !== 'list' ? (
						<motion.div className={gridColsClass}>
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
												<div className='overflow-hidden bg-border/20'>
													<img
														src={imgUrl(it.thumb, 2000)}
														alt={it.thumb?.alt || it.title || ''}
														className='w-full h-auto object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]'
														loading='lazy'
														decoding='async'
													/>
												</div>
											</Link>
										) : (
											<div className='overflow-hidden bg-border/20'>
												<img src={imgUrl(it.thumb, 2000)} alt={it.thumb?.alt || it.title || ''} className='w-full h-auto object-cover' loading='lazy' decoding='async' />
											</div>
										)}
									</motion.div>
								))}
							</AnimatePresence>
						</motion.div>
					) : (
						/* ===== LIST VIEW ===== */
						<div className='relative'>
							<div className='hidden lg:block fixed right-[7rem] top-[30vh] z-10 w-[380px] pointer-events-none'>
								<AnimatePresence mode='wait'>
									{activeItem?.thumb ? (
										<motion.div
											key={activeItem.id}
											initial={{ opacity: 0, y: 8, scale: 0.98 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={{ opacity: 0, y: -8, scale: 0.98 }}
											transition={{ duration: 0.18, ease: 'easeOut' }}
											className='overflow-hidden bg-border'
										>
											<img src={imgUrl(activeItem.thumb, 1200)} alt='' className='w-full h-auto object-cover' loading='lazy' decoding='async' />
										</motion.div>
									) : null}
								</AnimatePresence>
							</div>

							<div className='border-t border-black' />

							<div className='divide-y divide-black'>
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
											<div className='col-span-7 text-nav font-[600]'>{it.title || ''}</div>
											<div className='col-span-2 text-navLight opacity-80'>{it.tag}</div>
											<div className='col-span-3 text-navLight opacity-80 text-right'>{it.year ? it.year : ''}</div>

											<div className='col-span-12 lg:hidden pt-4'>
												<AnimatePresence>
													{isActive ? (
														<motion.div
															initial={{ opacity: 0, height: 0 }}
															animate={{ opacity: 1, height: 'auto' }}
															exit={{ opacity: 0, height: 0 }}
															transition={{ duration: 0.18, ease: 'easeOut' }}
															className='rounded-[1rem] overflow-hidden'
														>
															<img src={imgUrl(it.thumb, 1400)} alt='' className='w-full h-auto object-cover' />
														</motion.div>
													) : null}
												</AnimatePresence>
											</div>
										</motion.div>
									);

									return it.href ? (
										<Link key={it.id} to={it.href} className='block'>
											{RowInner}
										</Link>
									) : (
										<div key={it.id}>{RowInner}</div>
									);
								})}
							</div>

							<div className='border-t border-black' />
							<div className='hidden lg:block h-10' />
						</div>
					)}
				</>
			)}
		</div>
	);
}


