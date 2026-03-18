import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
	const rafRef = useRef(null);
	const [lenis, setLenis] = useState(null);

	useEffect(() => {
		const instance = new Lenis({
			duration: 1.1,
			smoothWheel: true,
			smoothTouch: false,
			touchMultiplier: 1.5,
			wheelMultiplier: 1,
		});

		setLenis(instance);

		const raf = time => {
			instance.raf(time);
			rafRef.current = requestAnimationFrame(raf);
		};

		rafRef.current = requestAnimationFrame(raf);

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			instance.destroy();
			setLenis(null);
		};
	}, []);

	return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
	return useContext(LenisContext);
}
