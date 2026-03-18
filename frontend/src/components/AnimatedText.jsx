import { motion } from 'framer-motion';
import { h1SlideUp, pFadeIn, pFadeInAfterH1 } from '../animations/variants';

export function AnimatedH1({ children, className = '' }) {
	return (
		<motion.div className={`overflow-hidden inline-block ${className}`} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.2 }}>
			<motion.h1 variants={h1SlideUp} className='inline-block will-change-transform ' whileHover={{ opacity: 0.6 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
				{children}
			</motion.h1>
		</motion.div>
	);
}


export function AnimatedH3({ children, className = '' }) {
	return (
		<motion.div className={`overflow-hidden inline-block ${className}`} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.2 }}>
			<motion.h3 variants={h1SlideUp} className='inline-block will-change-transform ' whileHover={{ opacity: 0.6 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
				{children}
			</motion.h3>
		</motion.div>
	);
}

export function AnimatedSmall({ children, className = '' }) {
	return (
		<motion.div className={`overflow-hidden inline-block ${className}`} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.2 }}>
			<motion.small variants={h1SlideUp} className='inline-block will-change-transform ' whileHover={{ opacity: 0.6 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
				{children}
			</motion.small>
		</motion.div>
	);
}

export function AnimatedButton({ children, onClick, className = '' }) {
	return (
		<motion.div className={`overflow-hidden inline-block ${className}`} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.2 }}>
			<motion.button onClick={onClick} variants={h1SlideUp} className='inline-block will-change-transform cursor-pointer '>
				{children}
			</motion.button>
		</motion.div>
	);
}

export function AnimatedP({ children, className = '' }) {
	return (
		<motion.p variants={pFadeIn} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.2 }} className={className}>
			{children}
		</motion.p>
	);
}

export function AnimatedPAfterH1({ children, className = '' }) {
	return (
		<motion.p variants={pFadeInAfterH1} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.2 }} className={className}>
			{children}
		</motion.p>
	);
}

export function AnimatedPAfterH3({ children, className = '' }) {
	return (
		<motion.p variants={pFadeInAfterH1} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.2 }} className={className}>
			{children}
		</motion.p>
	);
}

export function AnimatedH2AfterH1({ children, className = '' }) {
	return (
		<motion.h2 variants={pFadeInAfterH1} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.2 }} className={className}>
			{children}
		</motion.h2>
	);
}

export function AnimatedImage({ src, alt, className = '', onClick }) {
	return <motion.img src={src} alt={alt} className={className} onClick={onClick} variants={pFadeIn} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.2 }} />;
}
