import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const images = ['../../public/site1.jpg', '../../public/site2.jpg', '../../public/site3.jpg'];

export function HeroGallery() {
	return (
		
			<section className=' w-screen h-[95vh] top-0 -z-10'>
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
							<div
								style={{
									width: '100%',
									height: '100%',
									backgroundImage: `url(${image})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
									animation: 'zoomEffect 6s linear',
								}}
								className='zoom-effect'
							></div>
						</SwiperSlide>
					))}
				</Swiper>
	
			</section>
		
	);
}
