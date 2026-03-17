import React from 'react';

const GridViewIcon3 = ({
	size = undefined,
	color = '#000000',
	strokeWidth = 0,
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
			<path fill='currentColor' d='M3 11V3h8v8zm0 10v-8h8v8zm10-10V3h8v8zm0 10v-8h8v8z' />
		</svg>
	);
};

export default GridViewIcon3;
