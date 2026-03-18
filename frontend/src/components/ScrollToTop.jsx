import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from './provider/LenisProvider.jsx';

export function ScrollToTop() {
	const { pathname, search } = useLocation();
	const lenis = useLenis();

	useEffect(() => {
		if (lenis) {
			lenis.scrollTo(0, { immediate: true });
		} else {
			window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
		}
	}, [pathname, search, lenis]);

	return null;
}
