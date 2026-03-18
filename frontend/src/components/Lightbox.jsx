import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function Lightbox({ open, onClose, images = [], index = 0, onPrev, onNext }) {
	const closeRef = useRef(null);

	const [cursor, setCursor] = useState({
		visible: false,
		x: 0,
		y: 0,
		side: null, // 'left' | 'right'
		overClose: false,
	});

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!open) return;

		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const hasMultiple = images.length > 1;

		const onKeyDown = e => {
			if (e.key === 'Escape') onClose?.();
			if (hasMultiple && e.key === 'ArrowLeft') onPrev?.();
			if (hasMultiple && e.key === 'ArrowRight') onNext?.();
		};

		window.addEventListener('keydown', onKeyDown);

		return () => {
			document.body.style.overflow = prevOverflow;
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [open, onClose, onPrev, onNext, images.length]);

	useEffect(() => {
		if (!open) {
			setCursor({
				visible: false,
				x: 0,
				y: 0,
				side: null,
				overClose: false,
			});
		}
	}, [open, index]);

	useEffect(() => {
		setLoaded(false);
	}, [open, index, images]);

	useEffect(() => {
		if (!open || !images.length) return;

		const preload = src => {
			if (!src) return;
			const img = new window.Image();
			img.src = src;
		};

		const currentImage = images[index];
		const prevImage = images[(index - 1 + images.length) % images.length];
		const nextImage = images[(index + 1) % images.length];

		preload(currentImage?.src);
		preload(prevImage?.src);
		preload(nextImage?.src);
	}, [open, index, images]);

	if (!open || !images.length) return null;

	const current = images[index];
	const hasMultiple = images.length > 1;

	const handleMouseMove = e => {
		const x = e.clientX;
		const y = e.clientY;
		const side = x < window.innerWidth / 2 ? 'left' : 'right';

		let overClose = false;

		if (closeRef.current) {
			const rect = closeRef.current.getBoundingClientRect();
			overClose = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
		}

		setCursor({
			visible: true,
			x,
			y,
			side,
			overClose,
		});
	};

	const handleMouseLeave = () => {
		setCursor(prev => ({
			...prev,
			visible: false,
		}));
	};

	const handleLightboxClick = e => {
		if (!hasMultiple) return;

		if (closeRef.current) {
			const rect = closeRef.current.getBoundingClientRect();
			const x = e.clientX;
			const y = e.clientY;

			const clickedClose = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

			if (clickedClose) return;
		}

		if (e.clientX < window.innerWidth / 2) onPrev?.();
		else onNext?.();
	};

	return createPortal(
		<div
			className='fixed inset-0 z-[9999] bg-[rgba(248,245,241)]'
			role='dialog'
			aria-modal='true'
			aria-label='Image viewer'
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onClick={handleLightboxClick}
			style={{
				cursor: hasMultiple && !cursor.overClose ? 'none' : 'default',
			}}
		>
			<div className='relative z-10 flex h-full w-full items-center justify-center p-6'>
				<div className='relative flex items-center justify-center max-h-[80vh] max-w-[92vw]'>
					<div className={['absolute inset-0 bg-[rgba(0,0,0,0.04)] transition-opacity duration-500', loaded ? 'opacity-0' : 'opacity-100'].join(' ')} aria-hidden='true' />

					{current ? (
						<img
							src={current.src}
							alt={current.alt || ''}
							draggable='false'
							onLoad={() => setLoaded(true)}
							className={['max-h-[80vh] max-w-[92vw] object-contain select-none transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0'].join(' ')}
						/>
					) : null}
				</div>

				<button
					ref={closeRef}
					type='button'
					aria-label='Close'
					onClick={e => {
						e.stopPropagation();
						onClose?.();
					}}
					className='absolute top-6 right-6 bg-[rgba(0,0,0,0.04)] backdrop-blur-[50px] px-4 py-3 transition duration-500 text-black/60 hover:text-black hover:bg-[rgba(0,0,0,0.1)]'
				>
					<X />
				</button>

				{hasMultiple && cursor.visible && !cursor.overClose ? (
					<div
						className='pointer-events-none cursor-none fixed z-[10000] -translate-x-1/2 -translate-y-1/2'
						style={{
							left: `${cursor.x}px`,
							top: `${cursor.y}px`,
						}}
					>
						<div className='flex h-12 w-14 items-center justify-center bg-[rgba(0,0,0,0.04)] backdrop-blur-[50px] text-black'>{cursor.side === 'left' ? <ChevronLeft /> : <ChevronRight />}</div>
					</div>
				) : null}
			</div>
		</div>,
		document.body,
	);
}
