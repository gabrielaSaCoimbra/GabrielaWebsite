import contactImage from '/piscina.jpg';
import { LocalImage } from '../components/LocalImage';

export function Contacts() {
	return (
		<>
			<section className=' pt-[25vh]  flex justify-center'>
				<h1 className='text-lead font-[600] tracking-[-0.02em] text-black/80 max-w-[20ch] text-center'>Let’s create together.</h1>
			</section>

			<section className='py-[4rem]'>
				<LocalImage src={contactImage} alt='Interior space' className='w-full h-[63vh] min-h-[520px]' imgClassName='w-full h-full object-cover' loading='eager' decoding='async' fetchPriority='high' />
			</section>

			<section className='pb-6'>
				<div className='grid grid-cols-3 gap-4 '>
					<div className='col-start-2 lg:w-[560px] flex gap-12 justify-between '>
						<div className='flex flex-col '>
							<span className='text-nav'>Office</span>
							<span>
								Rua de Pinto Bessa 290<br></br>4300-427 Porto
							</span>
						</div>
						<div className='flex flex-col gap-10'>
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
							<div className=' pt-10 opacity-45'>
								<span className='text-nav font-normal'>
									Designed by{' '}
									<a href='https://www.diogobrito.xyz' target='_blank' className='underline'>
										Diogo Brito
									</a>
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
