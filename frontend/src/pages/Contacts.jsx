import contactImage from '/piscina.jpg';

export function Contacts() {
	return (
		<>
			<section className='pt-[15vh] md:pt-[25vh] flex justify-center '>
				<h1 className='text-lead font-[600] tracking-[-0.02em] text-black/80  text-center'>Let’s create together.</h1>
			</section>

			<div className='py-[4rem] '>
				<img src={contactImage} alt='Interior space' />
			</div>

			<div className='pb-6 mx-6 md:mx-0 flex justify-center '>
				<div className='md:w-[560px] '>
					<div className='text-nav'>I am welcome to commissions, collaborations, and research-driven projects.</div>
					<div className=' pt-6 w-full flex flex-col md:flex-row gap-3 md:gap-12 justify-between '>
						<div className='flex flex-col '>
							<span className='text-nav'>Office</span>
							<span>
								Rua de Pinto Bessa 290<br></br>4300-427 Porto
							</span>
						</div>

						<div className='flex flex-col gap-4'>
							<div className='flex flex-col '>
								<span className='text-nav'>Enquiries</span>
								<a href='mailto:gabrieladesacoimbra@gmail.com' className='underline'>
									gabrieladesacoimbra@gmail.com
								</a>
							</div>
							<div className='flex flex-col '>
								<span className='text-nav'>Social</span>
								<a href='https://www.instagram.com/gabrieladesacoimbra' target='_blank' className='underline'>
									Instagram
								</a>
								<a href='https://www.instagram.com/gabrieladesacoimbra' target='_blank' className='underline'>
									LinkedIn
								</a>
							</div>
							<div className='flex flex-col '>
								<span className='text-nav'>Website designed by</span>

								<a href='https://www.diogobrito.xyz' target='_blank' className='underline'>
									Diogo Brito
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
