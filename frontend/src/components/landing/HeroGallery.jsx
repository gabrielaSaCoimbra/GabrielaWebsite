import site1 from '/HP_Hero2.jpg';
import site2 from '/HP_Hero1.jpg';
import site3 from '/Sala_2.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const images = [
	{ src: site1, alt: 'Hero image 1' },
	{ src: site2, alt: 'Hero image 2' },
	{ src: site3, alt: 'Hero image 3' },
];

export function HeroGallery() {
	return (
		<section className='w-screen h-[80vh] top-0 -z-10'>
			<Swiper
				modules={[Autoplay, EffectFade]}
				effect='fade'
				loop={true}
				autoplay={{
					delay: 6000,
					disableOnInteraction: false,
				}}
				fadeEffect={{ crossFade: true }}
				style={{
					width: '100%',
					height: '100%',
				}}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<div className='relative w-full h-full overflow-hidden'>
							<img
								src={image.src}
								alt={image.alt}
								className='w-full h-full object-cover zoom-effect'
								loading={index === 0 ? 'eager' : 'lazy'}
								decoding='async'
								fetchPriority={index === 0 ? 'high' : 'auto'}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
