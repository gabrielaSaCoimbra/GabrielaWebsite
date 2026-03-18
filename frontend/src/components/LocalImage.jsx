import { useState } from 'react';

export function LocalImage({ src, alt = '', className = '', imgClassName = '', loading = 'lazy', decoding = 'async', fetchPriority = 'auto', onLoad }) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className={`relative overflow-hidden ${className}`}>
			<div className={['absolute inset-0 bg-[rgba(0,0,0,0.04)] transition-opacity duration-500', loaded ? 'opacity-0' : 'opacity-100'].join(' ')} aria-hidden='true' />

			<img
				src={src}
				alt={alt}
				loading={loading}
				decoding={decoding}
				fetchPriority={fetchPriority}
				onLoad={e => {
					setLoaded(true);
					onLoad?.(e);
				}}
				className={['block transition-opacity duration-500', imgClassName, loaded ? 'opacity-100' : 'opacity-0'].join(' ')}
			/>
		</div>
	);
}
