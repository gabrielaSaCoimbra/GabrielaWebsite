import { createImageUrlBuilder } from '@sanity/image-url';
import sanityClient from './sanity.client';

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source) {
	return builder.image(source);
}

export const IMAGE_PRESETS = {
	tile: {
		width: 1400,
		quality: 68,
		widths: [480, 768, 1024, 1400],
	},
	card: {
		width: 960,
		quality: 66,
		widths: [320, 480, 640, 800, 960],
	},
	detail: {
		width: 1600,
		quality: 72,
		widths: [640, 960, 1200, 1400, 1600],
	},
	lightbox: {
		width: 2200,
		quality: 76,
		widths: [1200, 1600, 2000, 2200],
	},
	small: {
		width: 700,
		quality: 62,
		widths: [240, 400, 560, 700],
	},
};

export function imageUrl(source, preset = 'card', overrides = {}) {
	if (!source) return '';

	const config = {
		...(IMAGE_PRESETS[preset] || IMAGE_PRESETS.card),
		...overrides,
	};

	let image = builder.image(source);

	if (config.width) image = image.width(config.width);
	if (config.quality) image = image.quality(config.quality);

	image = image.auto('format');

	return image.url();
}

export function imageSrcSet(source, preset = 'card', overrides = {}) {
	if (!source) return '';

	const config = {
		...(IMAGE_PRESETS[preset] || IMAGE_PRESETS.card),
		...overrides,
	};

	const widths = config.widths || [config.width].filter(Boolean);

	return widths
		.map(w => {
			let image = builder.image(source).width(w);

			if (config.quality) image = image.quality(config.quality);

			image = image.auto('format');

			return `${image.url()} ${w}w`;
		})
		.join(', ');
}

export function imageAttrs(source, preset = 'card', overrides = {}) {
	const config = {
		...(IMAGE_PRESETS[preset] || IMAGE_PRESETS.card),
		...overrides,
	};

	return {
		src: imageUrl(source, preset, overrides),
		srcSet: imageSrcSet(source, preset, overrides),
		sizes: config.sizes,
	};
}
