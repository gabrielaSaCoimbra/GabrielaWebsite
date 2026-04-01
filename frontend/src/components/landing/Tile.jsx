import { Link } from 'react-router-dom';
import { SanityImage } from '../SanityImage.jsx';

export function Tile({ to, imageData, label, className = '', loading = 'lazy' }) {
	return (
		<Link to={to} className={`group block ${className}`} aria-label={label}>
			<div className='relative overflow-hidden'>
				<SanityImage
					image={imageData}
					preset='tile'
					alt={label || ''}
					className='w-full'
					imgClassName='w-full h-auto object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]'
					loading={loading}
					sizes='(max-width: 767px) 100vw, 42vw'
				/>

				<div className='absolute inset-0 bg-black/0 transition-colors duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:bg-black/5' />

				<div className='absolute inset-0 grid place-items-center pointer-events-none'>
					<span
						className='text-center
							bg-[rgba(0,0,0,0.04)] backdrop-blur-[50px] px-6 py-3 text-nav
							text-black/80
							opacity-0 translate-y-[6px]
							transition-[opacity,transform] duration-[900ms]
							ease-[cubic-bezier(.22,1,.36,1)]
							group-hover:opacity-100 group-hover:translate-y-0'
					>
						{label}
					</span>
				</div>
			</div>
		</Link>
	);
}
