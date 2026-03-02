import { useEffect } from 'react';

export function ErrorPage() {

	useEffect(() => {
		const timer = setTimeout(() => {
			window.location.href = '/';
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			<div className='w-full h-screen flex justify-center items-center text-xl flex-col'>
				erro 
			</div>
		</div>
	);
}
