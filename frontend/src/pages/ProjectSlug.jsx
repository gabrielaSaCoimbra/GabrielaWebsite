import { useParams, Link } from 'react-router-dom';
import { useProjectBySlug } from '../hooks/useProjectsSlug.js';
import { urlFor } from '../lib/sanity.image.js';
import { PortableText } from '@portabletext/react';

const CATEGORY_LABEL = {
	architecture: 'Architecture',
	product: 'Product',
	exhibition: 'Exhibitions',
	ambient: 'Ambient',
};


function imgUrl(image, width) {
	if (!image) return '';
	return urlFor(image).width(width).quality(80).auto('format').url();
}

export function ProjectSlug() {
	const { slug } = useParams();
	const { data, loading } = useProjectBySlug(slug);

	if (loading) return <div className='container-page pt-[25vh] px-[7rem]'>Loading…</div>;
	if (!data) return <div className='container-page pt-[25vh] px-[7rem]'>Not found</div>;

	return (
		<div className='container-page pt-[25vh] pb-[7rem] pr-[7rem] pl-[7rem]'>
			<h1 className='text-lead2 font-[600] max-w-[23ch] '>{data.title}</h1>

			<div className='grid grid-cols-6 gap-8 mt-[3rem]'>
				<div className='col-span-2'>
					<div className='grid grid-cols-3 gap-2'>
						<div>
							Category<br></br>
							{data.category ? <div className=''>{CATEGORY_LABEL[data.category] || data.category}</div> : null}
						</div>
						<div>
							Year<br></br>
							{data.year ? <span>{data.year}</span> : null}
						</div>
						<div>
							Client<br></br> {data.client ? <span>{data.client}</span> : null}
						</div>
					</div>
				</div>
				<div className='col-span-4'>
					{data.description?.length ? (
						<div className=' max-w-[60ch]   '>
							<PortableText value={data.description} />
						</div>
					) : null}
				</div>
			</div>

			<div className=' mt-[4rem] flex flex-col gap-8'>
				{(data.images || []).map((img, i) => (
					<div key={img.asset?._id || i} className='rounded-[1rem] overflow-hidden '>
						<img src={imgUrl(img, 2200)} alt={img.alt || ''} className='w-full h-auto object-cover' loading='lazy' decoding='async' />
					</div>
				))}
			</div>
		</div>
	);
}
