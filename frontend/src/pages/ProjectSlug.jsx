import { useParams, Link } from 'react-router-dom';
import { useProjectBySlug } from '../hooks/useProjectsSlug.js';
import { urlFor } from '../lib/sanity.image.js';
import { PortableText } from '@portabletext/react';
import { useMoreWorkSameCategory } from '../hooks/useMoreWorkSameCategory';

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

function imgUrl(image, width) {
	if (!image) return '';
	return urlFor(image).width(width).quality(70).auto('format').url();
}

export function ProjectSlug() {
	const { slug } = useParams();
	const { data, loading } = useProjectBySlug(slug);

	const { items: moreWork = [], loading: moreLoading } = useMoreWorkSameCategory({
		slug, // ✅ usa o slug do URL
		category: data?.category,
	});

	if (loading) return <div className='container-page pt-[25vh] px-[7rem]'>Loading…</div>;
	if (!data) return <div className='container-page pt-[25vh] px-[7rem]'>Not found</div>;

	const moreTitle = data?.category ? `More ${MORE_LABEL[data.category] || data.category}` : 'More work'; // ✅ aqui dentro

	const images = data.images || [];
	const isSingle = images.length <= 1;

	return (
		<div className='pt-[17vh] pb-[7rem] pr-[7rem] pl-[7rem]'>
			<div className='flex flex-col justify-center items-center'>
				<h1 className='text-lead font-[600] max-w-[23ch] mb-6 text-center'>{data.title}</h1>

				<div className='bg-[rgba(0,0,0,0.04)] backdrop-blur-[50px] px-4 py-3 text-nav'>{data.category ? <div>{CATEGORY_LABEL[data.category] || data.category}</div> : null}</div>

				<div className='mt-[3rem]'>
					<div className='w-[560px] mb-2'>{data.description?.length ? <PortableText value={data.description} /> : null}</div>

					<div className='flex gap-6'>
						<span className='opacity-60'>Year</span>
						{data.year ? <span>{data.year}</span> : null}
					</div>

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
						<div className='overflow-hidden'>
							<img src={imgUrl(images[0], 2400)} alt={images[0]?.alt || ''} className='w-full h-auto object-cover' loading='lazy' decoding='async' />
						</div>
					) : null
				) : (
					<div className='columns-1 lg:columns-2 [column-gap:3rem]'>
						{images.map((img, i) => (
							<div key={img.asset?._id || i} className='mb-8 break-inside-avoid overflow-hidden'>
								<img src={imgUrl(img, 1800)} alt={img.alt || ''} className='w-full h-auto object-cover' loading='lazy' decoding='async' />
							</div>
						))}
					</div>
				)}
			</div>

			{/* MORE WORK */}
			{!moreLoading && moreWork.length > 0 ? (
				<div className='mt-[6rem]'>
					<hr className='border-[rgba(0,0,0,0.1)] mb-10' />
					<div className='text-center text-nav mb-10'>{moreTitle}</div>

					<div className='grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-10 items-start'>
						{moreWork.map(p => (
							<div key={p._id} className='text-center'>
								<Link to={p.slug?.current ? `/projects/${p.slug.current}` : '/projects'} className='group block'>
									<div className='overflow-hidden '>
										<img
											src={imgUrl(p.cover, 1400)}
											alt={p.cover?.alt || p.title || ''}
											className='w-full h-auto object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]'
											loading='lazy'
											decoding='async'
										/>
									</div>
								</Link>
								<div className='mt-6 text-sm'>{p.title}</div>
							</div>
						))}
					</div>
				</div>
			) : null}
		</div>
	);
}
