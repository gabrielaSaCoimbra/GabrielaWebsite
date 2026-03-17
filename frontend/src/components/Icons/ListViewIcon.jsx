import React from 'react';

const ListsIcon = ({
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
			<path fill='currentColor' d='M2 20v-4h4v4zm6 0v-4h14v4zm-6-6v-4h4v4zm6 0v-4h14v4zM2 8V4h4v4zm6 0V4h14v4z' />
		</svg>
	);
};

export default ListsIcon;
