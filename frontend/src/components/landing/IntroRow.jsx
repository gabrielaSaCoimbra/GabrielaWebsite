import { AnimatedH1, AnimatedPAfterH1 } from "../AnimatedText";

export  function IntroRow() {
	return (
		<section className='py-[4rem] md:py-[7rem] md:px-[7rem] px-6 text-black/80 '>
			<div className='flex flex-col justify-center items-center gap-6 md:gap-12'>
				<AnimatedH1 className='text-lead lg:text-h1 lg:font-[600] '>Hello.</AnimatedH1>

				<div className='lg:w-[950px]'>
					<AnimatedPAfterH1 className='text-lead text-black/80 font-[600] '>I'm Gabriela, a 3D artist and spatial designer working across architecture, objects, and speculative spaces.</AnimatedPAfterH1>
				</div>
			</div>
		</section>
	);
}
