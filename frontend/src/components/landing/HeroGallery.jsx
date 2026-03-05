import hero1 from '../../../public/Sala_1.jpg';

export function HeroGallery() {
	return (
		<section className='w-full'>
			<div className='relative w-full min-h-[80svh]'>
				<img src={hero1} alt='' className='absolute inset-0 h-full w-full object-cover ' loading='eager' decoding='async' />
			</div>
		</section>
	);
}
