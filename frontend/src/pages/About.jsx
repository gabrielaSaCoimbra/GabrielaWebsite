import img1 from '../../public/9.jpg';
import img2 from '../../public/Cave.jpg';
import img3 from '../../public/site2.jpg';
import img4 from '../../public/Sala_1.jpg';
import img5 from '../../public/Sala_1.jpg';
import img6 from '../../public/Sala_1.jpg';

const IMAGES = [
	{ src: img1, alt: 'About 1' },
	{ src: img2, alt: 'About 2' },
	{ src: img3, alt: 'About 3' },
	{ src: img4, alt: 'About 4' },
	{ src: img5, alt: 'About 5' },
	{ src: img6, alt: 'About 6' },
];

export function About() {
	const loop = [...IMAGES, ...IMAGES];

	return (
		<div>
			<section className='px-[7rem] pt-[25vh] text-white flex items-center justify-center '>
				<p className='text-lead text-fg/90 font-[600]'>
					I'm a 3D artist passionate about bringing spaces and ideas to life through digital visualization. With a keen eye for detail and a deep understanding of lighting, materials and composition,
					my creations are immersive environments that blend realism with artistic expression.
				</p>
			</section>
			<section className='pt-[15vh]'>
				<div className='w-full marquee'>
					<div>
						<div className='marquee__track' aria-hidden='true'>
							{loop.map((img, i) => (
								<div key={i} className='marquee__item'>
									<div className='marquee__card'>
										<img src={img.src} alt={img.alt} className='marquee__img' loading='lazy' decoding='async' />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
			<section className='pt-[15vh] px-[7rem]   text-white flex items-center justify-center '>
				<p className='text-lead text-fg/90 font-[600]'>
					Specializing in interior visualization and artistic 3D work, my projects go beyond mere representation - they evoke mood, atmosphere, and storytelling. Whether it's a high-end architectual
					space, a conceptual piece, or an experimental scene, each render is crafted to engage, inspire and resonate.
				</p>
			</section>
		</div>
	);
}
