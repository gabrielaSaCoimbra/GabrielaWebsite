import React from 'react';

const GridViewIcon4 = ({
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
			<path
				fill='currentColor'
				d='M3 21h4.675v-4.675H3zm6.675 0h4.65v-4.675h-4.65zm6.65 0H21v-4.675h-4.675zM3 14.325h4.675v-4.65H3zm6.675 0h4.65v-4.65h-4.65zm6.65 0H21v-4.65h-4.675zM3 7.675h4.675V3H3zm6.675 0h4.65V3h-4.65zm6.65 0H21V3h-4.675z'
			/>
		</svg>
	);
};

export default GridViewIcon4;
