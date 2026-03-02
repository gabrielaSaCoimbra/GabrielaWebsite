import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function LenisProvider({ children }) {
	const lenisRef = useRef(null);
	const rafRef = useRef(null);

	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.1,
			smoothWheel: true,
			smoothTouch: false, 
			touchMultiplier: 1.5,
			wheelMultiplier: 1,
		});

		lenisRef.current = lenis;

		const raf = time => {
			lenis.raf(time);
			rafRef.current = requestAnimationFrame(raf);
		};
		rafRef.current = requestAnimationFrame(raf);

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			lenis.destroy();
			lenisRef.current = null;
		};
	}, []);

	return children;
}
