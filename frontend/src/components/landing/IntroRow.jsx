export  function IntroRow() {
	return (
		<section className='py-[5rem] md:py-[8rem] px-[7rem] '>
			<div className='grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start'>
				<div className='md:col-span-2'>
					<h2 className='text-h1 font-[600] '>Hello.</h2>
				</div>

				<div className='md:col-span-9 '>
					<p className='text-lead text-fg/90 font-[600] '>I’m Gabriela, a 3D artist passionate about bringing spaces and ideas to life through digital visualization.</p>
				</div>
			</div>
		</section>
	);
}
