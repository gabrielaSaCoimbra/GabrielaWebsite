import React from 'react';

const CloseSmallIcon = ({
	size = undefined,
	color = '#000000',
	strokeWidth = 2,
	background = 'transparent',
	opacity = 1,
	rotation = 0,
	shadow = 0,
	flipHorizontal = false,
	flipVertical = false,
	padding = 0,
}) => {
	const transforms = [];
	if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
	if (flipHorizontal) transforms.push('scaleX(-1)');
	if (flipVertical) transforms.push('scaleY(-1)');

	const viewBoxSize = 24 + padding * 2;
	const viewBoxOffset = -padding;
	const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			width={size}
			height={size}
			fill='none'
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap='round'
			strokeLinejoin='round'
			style={{
				opacity,
				transform: transforms.join(' ') || undefined,
				filter: shadow > 0 ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))` : undefined,
				backgroundColor: background !== 'transparent' ? background : undefined,
			}}
		>
			<path fill='currentColor' d='m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z' />
		</svg>
	);
};

export default CloseSmallIcon;
