import contactImage from '/piscina.jpg';
import { LocalImage } from '../components/LocalImage';

export function Contacts() {
	return (
		<>
			<section className=' pt-[40vh] pb-[2rem] flex justify-center'>
				<h1 className='text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] font-[600] tracking-[-0.02em] text-black/80'>Let&apos;s connect.</h1>
			</section>

			<section className='pb-[4rem]'>
				<LocalImage
					src={contactImage}
					alt='Interior space'
					className='w-full h-[calc(100vh-20rem)] min-h-[520px]'
					imgClassName='w-full h-full object-cover'
					loading='eager'
					decoding='async'
					fetchPriority='high'
				/>
			</section>

			<section>
				<div className='flex flex-col justify-center items-center gap-1'>
					<div>Office</div>
					<div>wev</div>
				</div>
			</section>
		</>
	);
}
