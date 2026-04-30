import { useMemo, useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LocalImage } from '../components/LocalImage';

import img1 from '/public/AboutImgs/1.jpg';
import img2 from '/public/AboutImgs/2.jpg';
import img3 from '/public/AboutImgs/3.jpg';
import img4 from '/public/AboutImgs/4.jpg';
import img5 from '/public/AboutImgs/5.jpg';
import img6 from '/public/AboutImgs/6.jpg';
import bgImage from '/ABOUT1.jpg';

const IMAGES = [
	{ src: img1, alt: '' },
	{ src: img2, alt: '' },
	{ src: img3, alt: '' },
	{ src: img4, alt: '' },
	{ src: img5, alt: '' },
	{ src: img6, alt: '' },
];

const BIO_LINES = [
	'I am a 3D artist and spatial designer working across architecture, objects, and speculative environments. ',
	'My practice centres on constructing images that do more than represent space, they articulate it.',
	'In collaboration with architects, designers, and brands, I develop visualisations that give form to design intent, shaping material, light, and atmosphere into precise spatial experiences.',
];

const BIO_LINES1 = [
	'Alongside commissioned work, I maintain an ongoing authorial practice where 3D functions as a testing ground for spatial ideas. Here, I work through material, colour, density, and light as active elements, examining how space registers in the body, how it is sensed, inhabited, and remembered. ',
	'Operating between the digital and the physical, my work treats visualisation as both method and medium: a way of thinking through space, not simply depicting it.',
];

const REVEAL_TEXT = ['I', 'am', 'dedicated', 'to', 'transforming', 'ideas', 'into', 'visually', 'striking', 'and', 'emotionally', 'compelling', 'imagery.'];

function AnimatedWordsLine({ text, lineIndex = 0, className = '' }) {
	const words = text.split(' ');

	return (
		<p className={className}>
			{words.map((word, index) => (
				<motion.span
					key={`${word}-${lineIndex}-${index}`}
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.9 }}
					transition={{
						duration: 0.45,
						ease: 'easeInOut',
						delay: lineIndex * 0.2 + index * 0.02,
					}}
					className='inline-block mr-[0.22em] will-change-transform will-change-opacity'
				>
					{word}
				</motion.span>
			))}
		</p>
	);
}

function BioIntro() {
	return (
		<div className=' md:w-[1320px]'>
			{BIO_LINES.map((line, index) => (
				<AnimatedWordsLine key={index} text={line} lineIndex={index} className='text-about font-[500] text-black/80 mb-[0.1em] last:mb-0' />
			))}
		</div>
	);
}

function BioIntro1() {
	return (
		<div className=' md:w-[1320px]'>
			{BIO_LINES1.map((line, index) => (
				<AnimatedWordsLine key={index} text={line} lineIndex={index} className='text-about font-[500] text-black/80 mb-[0.1em] last:mb-0' />
			))}
		</div>
	);
}

function RevealWord({ word, index, total, progress }) {
	const segment = 1 / total;
	const start = index * segment;
	const end = Math.min(start + segment * 1.8, 1);

	const opacity = useTransform(progress, [start, end], [0.25, 1], {
		clamp: true,
	});

	return (
		<motion.span style={{ opacity }} className='inline-block mr-[0.22em] text-white will-change-[opacity] '>
			{word}
		</motion.span>
	);
}

function StickyRevealTransition({ bgImage, children }) {
	const wrapperRef = useRef(null);
	const overlayRef = useRef(null);

	const [viewportH, setViewportH] = useState(0);
	const [overlayH, setOverlayH] = useState(0);

	const revealDistance = 900;

	useEffect(() => {
		const updateHeights = () => {
			setViewportH(window.innerHeight);
			setOverlayH(overlayRef.current?.offsetHeight ?? 0);
		};

		updateHeights();

		const resizeObserver = new ResizeObserver(() => {
			updateHeights();
		});

		if (overlayRef.current) resizeObserver.observe(overlayRef.current);
		window.addEventListener('resize', updateHeights);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener('resize', updateHeights);
		};
	}, []);

	const wrapperHeight = viewportH + revealDistance + overlayH;

	const { scrollYProgress } = useScroll({
		target: wrapperRef,
		offset: ['start start', `start -${revealDistance}px`],
	});

	return (
		<section ref={wrapperRef} className='relative' style={{ height: wrapperHeight || 'auto' }}>
			<div className='sticky top-0 h-screen overflow-hidden'>
				<div className='absolute inset-0'>
					<img src={bgImage} alt='' className='h-full w-full object-cover' />
				</div>

				<div className='relative z-10 flex h-full items-center justify-center px-6 md:px-12 lg:px-[7rem]'>
					<div className='md:w-[1000px] '>
						<div className='text-quote font-[600]'>
							{REVEAL_TEXT.map((word, index) => (
								<RevealWord key={`${word}-${index}`} word={word} index={index} total={REVEAL_TEXT.length} progress={scrollYProgress} />
							))}
						</div>
					</div>
				</div>
			</div>

			<div
				className='relative z-20'
				style={{
					marginTop: revealDistance,
				}}
			>
				<div ref={overlayRef} className='bg-[rgba(248,245,241)] text-black/80'>
					{children}
				</div>
			</div>
		</section>
	);
}

export function About() {
	const loop = useMemo(() => [...IMAGES, ...IMAGES], []);
	const [loadedCount, setLoadedCount] = useState(0);

	const handleImageLoad = index => {
		if (index >= IMAGES.length) return;

		setLoadedCount(prev => {
			const next = prev + 1;
			return next > IMAGES.length ? IMAGES.length : next;
		});
	};

	const marqueeReady = loadedCount >= 4;

	return (
		<div className='bg-[#c3876b]'>
			<section className='px-6 md:px-[7rem] pt-[15vh] md:pt-[25vh] flex items-center justify-center'>
				<BioIntro />
			</section>

			<section className='py-[5vh] md:pt-[17vh]'>
				<div className='w-full marquee'>
					<div>
						<div className={`marquee__track ${marqueeReady ? 'is-ready' : ''}`} aria-hidden='true'>
							{loop.map((img, i) => {
								const isFirstLoop = i < IMAGES.length;
								const isPriorityImage = isFirstLoop && i < 4;
								const isHighPriority = isFirstLoop && i < 2;

								return (
									<div key={i} className='marquee__item'>
										<LocalImage
											src={img.src}
											alt={img.alt}
											className='marquee__card'
											imgClassName='marquee__img'
											loading={isPriorityImage ? 'eager' : 'lazy'}
											decoding='async'
											fetchPriority={isHighPriority ? 'high' : 'auto'}
											onLoad={() => handleImageLoad(i)}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			<section className='px-6 md:px-[7rem] pt-[15vh] md:pt-[25vh] flex items-center justify-center'>
				<BioIntro1 />
			</section>

			<section className='py-[5vh] md:py-[10vh] px-6 md:px-[7rem] text-black/80 flex items-center justify-center'></section>

			<StickyRevealTransition bgImage={bgImage}>
				<section className='h-screen flex items-center justify-center'>
					<div className='flex flex-col justify-center items-center gap-6'>
						<div className='text-lead font-[600] text-center'>Let's Connect?</div>
						<NavLink to='/contact' className='bg-[rgba(0,0,0,0.04)] backdrop-blur-[50px] px-6 py-3 text-nav transition duration-500 hover:text-black hover:bg-[rgba(0,0,0,0.1)]'>
							Contacts
						</NavLink>
					</div>
				</section>
			</StickyRevealTransition>
		</div>
	);
}
