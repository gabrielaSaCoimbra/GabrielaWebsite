import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjectBySlug } from '../hooks/useProjectsSlug.js';
import { imageUrl } from '../lib/sanity.image.js';
import { SanityImage } from '../components/SanityImage';
import { PortableText } from '@portabletext/react';
import { useMoreWorkSameCategory } from '../hooks/useMoreWorkSameCategory';
import { Lightbox } from '../components/Lightbox';
import { AnimatedPAfterH1 } from '../components/AnimatedText.jsx';

const CATEGORY_LABEL = {
	architecture: 'Architecture',
	product: 'Product',
	exhibition: 'Artistic collaborations',
	ambient: 'Spatial studies',
};

const MORE_LABEL = {
	architecture: 'Architecture',
	product: 'Product',
	exhibition: 'Artistic collaborations',
	ambient: 'Spatial studies',
};

export function ProjectSlug() {
	const { slug } = useParams();
	const { data, loading } = useProjectBySlug(slug);

	const [lbOpen, setLbOpen] = useState(false);
	const [lbIndex, setLbIndex] = useState(0);

	const category = data?.category;
	const images = data?.images || [];

	const { items: moreWork = [], loading: moreLoading } = useMoreWorkSameCategory({
		slug,
		category,
	});

	const moreTitle = category ? `More ${MORE_LABEL[category] || category}` : 'More work';

	const lbImages = useMemo(() => {
		return images.map(img => ({
			src: imageUrl(img, 'lightbox'),
			alt: img?.alt || '',
		}));
	}, [images]);

	const openAt = i => {
		setLbIndex(i);
		setLbOpen(true);
	};

	const prev = () => setLbIndex(i => (i - 1 + lbImages.length) % lbImages.length);
	const next = () => setLbIndex(i => (i + 1) % lbImages.length);

	if (loading) {
		return (
			<div className='pt-[15vh] md:pt-[20vh] pb-6 md:pb-[7rem] md:px-[7rem] px-6'>
				<div className='flex flex-col justify-center items-center'>
					<div className='h-10 w-[18rem] bg-[rgba(0,0,0,0.04)] mb-6' />

					<div className='bg-[rgba(0,0,0,0.04)] h-[52px] w-[170px] mb-[3rem]' />

					<div className='w-[560px]'>
						<div className='h-4 w-full bg-[rgba(0,0,0,0.04)] mb-3' />
						<div className='h-4 w-[92%] bg-[rgba(0,0,0,0.04)] mb-3' />
						<div className='h-4 w-[78%] bg-[rgba(0,0,0,0.04)] mb-6' />

						<div className='flex gap-6 mb-2'>
							<div className='h-4 w-12 bg-[rgba(0,0,0,0.04)]' />
							<div className='h-4 w-16 bg-[rgba(0,0,0,0.04)]' />
						</div>

						<div className='flex gap-6'>
							<div className='h-4 w-14 bg-[rgba(0,0,0,0.04)]' />
							<div className='h-4 w-24 bg-[rgba(0,0,0,0.04)]' />
						</div>
					</div>
				</div>

				<div className='mt-[4rem] columns-1 lg:columns-2 [column-gap:3rem]'>
					{[520, 680, 460, 620].map((h, i) => (
						<div key={i} className='mb-8 break-inside-avoid'>
							<div className='bg-[rgba(0,0,0,0.04)] w-full' style={{ height: `${h}px` }} />
						</div>
					))}
				</div>
			</div>
		);
	}
	if (!data) return <div className='container-page pt-[25vh] px-[7rem]'>Not found</div>;

	const isSingle = images.length <= 1;

	return (
		<div className='pt-[15vh] md:pt-[20vh] pb-6 md:pb-[7rem] md:px-[7rem] px-6'>
			<div className='flex flex-col justify-center items-center'>
				<div className='text-lead font-[600] max-w-[23ch] mb-4 md:mb-6 text-center'>{data.title}</div>

				<div className='bg-[rgba(0,0,0,0.04)] backdrop-blur-[50px] px-4 py-3 text-nav'>{category ? <div>{CATEGORY_LABEL[category] || category}</div> : null}</div>

				<div className='mt-8 md:mt-[3rem]'>
					<div className='lg:w-[560px] mb-2'>{data.description?.length ? <PortableText value={data.description} /> : null}</div>

					{data.year ? (
						<div className='flex gap-6'>
							<span className='opacity-60'>Year</span>
							<span>{data.year}</span>
						</div>
					) : null}

					{data.client ? (
						<div className='flex gap-6'>
							<span className='opacity-60'>Client</span>
							<span>{data.client}</span>
						</div>
					) : null}
				</div>
			</div>

			{/* IMAGES */}
			<div className='mt-[4rem]'>
				{isSingle ? (
					images[0] ? (
						<button type='button' onClick={() => openAt(0)} className='block w-full overflow-hidden text-left' aria-label='Open image'>
							<SanityImage image={images[0]} preset='detail' alt={images[0]?.alt || ''} className='w-full' imgClassName='w-full h-auto object-cover' loading='eager' sizes='100vw' />
						</button>
					) : null
				) : (
					<div className='columns-1 lg:columns-2 gap-6 md:gap-[3rem]'>
						{images.map((img, i) => (
							<button key={img.asset?._id || i} type='button' onClick={() => openAt(i)} className='mb-6 md:mb-12 break-inside-avoid overflow-hidden block w-full text-left' aria-label={`Open image ${i + 1}`}>
								<SanityImage
									image={img}
									preset='detail'
									alt={img.alt || ''}
									className='w-full'
									imgClassName='w-full h-auto object-cover'
									loading={i === 0 ? 'eager' : 'lazy'}
									sizes='(max-width: 1023px) 100vw, 50vw'
								/>
							</button>
						))}
					</div>
				)}
			</div>

			{/* Lightbox */}
			<Lightbox open={lbOpen} onClose={() => setLbOpen(false)} images={lbImages} index={lbIndex} onPrev={prev} onNext={next} />

			{/* MORE WORK */}
			{!moreLoading && moreWork.length > 0 ? (
				<div className='mt-[4rem] md:mt-[6rem]'>
					<hr className='border-[rgba(0,0,0,0.1)] mb-10' />
					<AnimatedPAfterH1 className='text-center text-nav mb-10'>{moreTitle}</AnimatedPAfterH1>

					<div className='grid grid-cols-2 md:grid-cols-4 md:gap-10 gap-6 items-start'>
						{moreWork.map(p => (
							<div key={p._id} className='text-center'>
								<Link to={p.slug?.current ? `/projects/${p.slug.current}` : '/projects'} className='group block'>
									<div className='overflow-hidden'>
										<SanityImage
											image={p.cover}
											preset='card'
											alt={p.cover?.alt || p.title || ''}
											className='w-full'
											imgClassName='w-full h-auto object-cover transition-transform duration-[500ms] group-hover:scale-[1.02]'
											sizes='(max-width: 767px) 50vw, 25vw'
										/>
									</div>
								</Link>
								<AnimatedPAfterH1 className='mt-4 md:mt-6 text-sm'>{p.title}</AnimatedPAfterH1>
							</div>
						))}
					</div>
				</div>
			) : null}
		</div>
	);
}
