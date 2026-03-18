export const h1SlideUp = {
	hidden: { y: '100%' },
	show: {
		y: '0%',
		transition: { duration: 1, ease: [0.27, 0, 0.075, 1] },
	},
};



// Fade-in para parágrafos (<p>) com delay de 0.8s (após o h1)
export const pFadeInAfterH1 = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			duration: 1.5,
			ease: 'easeOut',
			delay: 0.25, // começa depois do h1 terminar
		},
	},
};

// Fade-in para parágrafos (<p>)
export const pFadeIn = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
};

// Transição de páginas (App.jsx)
export const pageTransition = {
	hidden: { opacity: 0 },
	enter: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
	exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};


