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
						group-hover:scale-[1.02]'
				/>

				<div className='absolute inset-0 bg-black/0 transition-colors duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:bg-black/5' />

				<div className='absolute inset-0 grid place-items-center pointer-events-none'>
					<span
						className=' text-center
							bg-[rgba(0,0,0,0.04)] backdrop-blur-[50px] px-4 py-3 text-nav
							text-black/80  
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
