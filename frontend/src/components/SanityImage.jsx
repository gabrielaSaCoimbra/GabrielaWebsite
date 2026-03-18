import { useState } from 'react';
import { imageAttrs } from '../lib/sanity.image';

export function SanityImage({ image, preset = 'card', alt = '', className = '', imgClassName = '', loading = 'lazy', decoding = 'async', onClick, sizes }) {
	const [loaded, setLoaded] = useState(false);

	const aspectRatio = image?.asset?.metadata?.dimensions?.aspectRatio;
	const hasRatio = Boolean(aspectRatio);

	const {
		src,
		srcSet,
		sizes: presetSizes,
	} = imageAttrs(image, preset, {
		sizes,
	});

	if (!src) return null;

	return (
		<div className={`relative overflow-hidden ${className}`} style={hasRatio ? { aspectRatio } : undefined}>
			<div className={['absolute inset-0 bg-[rgba(0,0,0,0.04)] transition-opacity duration-500', loaded ? 'opacity-0' : 'opacity-100'].join(' ')} aria-hidden='true' />

			<img
				src={src}
				srcSet={srcSet || undefined}
				sizes={sizes || presetSizes || undefined}
				alt={alt}
				loading={loading}
				decoding={decoding}
				onClick={onClick}
				onLoad={() => setLoaded(true)}
				className={[hasRatio ? 'absolute inset-0 h-full w-full' : 'relative', 'block transition-opacity duration-500', imgClassName, loaded ? 'opacity-100' : 'opacity-0'].join(' ')}
			/>
		</div>
	);
}
