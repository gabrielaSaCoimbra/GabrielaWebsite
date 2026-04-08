import site1 from '/ImgHomePage/HOMEPAGE1.webp';
import site2 from '/ImgHomePage/HOMEPAGE2.webp';
import site3 from '/ImgHomePage/HOMEPAGE3.webp';
import site4 from '/ImgHomePage/HOMEPAGE4.webp';

import mobile1 from '/ImgHomePage/MOBILE1.webp';
import mobile2 from '/ImgHomePage/MOBILE2.webp';
import mobile3 from '/ImgHomePage/MOBILE3.webp';
import mobile4 from '/ImgHomePage/MOBILE4.webp';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const desktopImages = [
	{ src: site1, alt: 'Hero image 1' },
	{ src: site2, alt: 'Hero image 2' },
	{ src: site3, alt: 'Hero image 3' },
	{ src: site4, alt: 'Hero image 4' },
];

const mobileImages = [
	{ src: mobile1, alt: 'Hero image 1' },
	{ src: mobile2, alt: 'Hero image 2' },
	{ src: mobile3, alt: 'Hero image 3' },
	{ src: mobile4, alt: 'Hero image 4' },
];

function HeroSwiper({ images, priority = 'desktop' }) {
	return (
		<Swiper
			modules={[Autoplay, EffectFade]}
			effect='fade'
			loop={true}
			speed={2800}
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
					<div className='relative w-full h-full overflow-hidden pointer-events-none'>
						<img
							src={image.src}
							alt={image.alt}
							className='w-full h-full object-cover zoom-effect pointer-events-none'
							loading={index === 0 ? 'eager' : 'lazy'}
							decoding='async'
							fetchPriority={index === 0 ? 'high' : 'auto'}
						/>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}

export function HeroGallery() {
	return (
		<section className='w-screen md:mt-[10vh] -z-10'>
			{/* DESKTOP */}
			<div className='hidden md:block h-[90vh]'>
				<HeroSwiper images={desktopImages} />
			</div>

			{/* MOBILE */}
			<div className='block md:hidden h-[60vh] mt-[100px]'>
				<HeroSwiper images={mobileImages} />
			</div>
		</section>
	);
}
