import { useMemo, useState } from 'react';
import { LocalImage } from '../components/LocalImage';

import img1 from '/9.jpg';
import img2 from '/Cave.jpg';
import img3 from '/site2.jpg';
import img4 from '/Sala_1.jpg';
import img5 from '/Sala_1.jpg';
import img6 from '/Sala_1.jpg';

const IMAGES = [
	{ src: img1, alt: '' },
	{ src: img2, alt: '' },
	{ src: img3, alt: '' },
	{ src: img4, alt: '' },
	{ src: img5, alt: '' },
	{ src: img6, alt: '' },
];

export function About() {
	const loop = useMemo(() => [...IMAGES, ...IMAGES], []);
	const [loadedCount, setLoadedCount] = useState(0);

	const handleImageLoad = index => {
		// só contamos as imagens do primeiro bloco real
		if (index >= IMAGES.length) return;

		setLoadedCount(prev => {
			const next = prev + 1;
			return next > IMAGES.length ? IMAGES.length : next;
		});
	};

	const marqueeReady = loadedCount >= 4;

	return (
		<div className='bg-[#f6ffcc]'>
			<section className='px-[7rem] pt-[25vh] text-white flex items-center justify-center'>
				<p className='text-lead text-fg/90 font-[600]'>
					I'm a 3D artist passionate about bringing spaces and ideas to life through digital visualization. With a keen eye for detail and a deep understanding of lighting, materials and composition,
					my creations are immersive environments that blend realism with artistic expression.
				</p>
			</section>

			<section className='pt-[15vh]'>
				<div className='w-full marquee'>
					<div>
						<div className={`marquee__track ${marqueeReady ? 'is-ready' : ''}`} aria-hidden='true'>
							{loop.map((img, i) => {
								const isFirstLoop = i < IMAGES.length;
								const isPriorityImage = isFirstLoop && i < 4;
								const isHighPriority = isFirstLoop && i < 2;

								return (
									<div key={i} className='marquee__item'>
										<div key={i} className='marquee__item'>
											<LocalImage
												src={img.src}
												alt={img.alt}
												className='marquee__card'
												imgClassName='marquee__img'
												loading={isPriorityImage ? 'eager' : 'lazy'}
												decoding='async'
												fetchPriority={isHighPriority ? 'high' : 'auto'}
												onLoad={() => handleImageLoad(i)}
											/>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			<section className='pt-[15vh] px-[7rem] text-white flex items-center justify-center'>
				<p className='text-lead text-fg/90 font-[600]'>
					Specializing in interior visualization and artistic 3D work, my projects go beyond mere representation - they evoke mood, atmosphere, and storytelling. Whether it's a high-end architectual
					space, a conceptual piece, or an experimental scene, each render is crafted to engage, inspire and resonate.
				</p>
			</section>
		</div>
	);
}
