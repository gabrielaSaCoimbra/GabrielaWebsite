import { Link } from 'react-router-dom';

export function Tile({ to, image, label, className = '' }) {
	return (
		<Link to={to} className={`group block ${className}`} aria-label={label}>
			<div className='relative overflow-hidden '>
				<img
					src={image}
					alt=''
					className='
						w-full h-auto object-cover
						transition-transform duration-[900ms]
						ease-[cubic-bezier(.22,1,.36,1)]
						group-hover:scale-[1.02]'
				/>

				<div className='absolute inset-0 bg-black/0 transition-colors duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:bg-black/10' />

				<div className='absolute inset-0 grid place-items-center pointer-events-none'>
					<span
						className='
							px-8 py-3 rounded-full
							bg-white/25 border-[0.6px] border-white/40
							backdrop-blur-2xl
							shadow-[0_12px_40px_rgba(0,0,0,0.15)]
							text-[#f8f5f1] font-semibold text-nav
							opacity-0 translate-y-[6px]
							transition-[opacity,transform] duration-[900ms]
							ease-[cubic-bezier(.22,1,.36,1)]
							group-hover:opacity-100 group-hover:translate-y-0
						'
					>
						{label}
					</span>
				</div>
			</div>
		</Link>
	);
}
