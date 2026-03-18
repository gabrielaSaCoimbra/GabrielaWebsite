import { useEffect } from 'react';

export function ErrorPage() {

	useEffect(() => {
		const timer = setTimeout(() => {
			window.location.href = '/';
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			<div className='w-full h-screen flex justify-center items-center text-nav flex-col'>
				Page not Found. Redirecting...
			</div>
		</div>
	);
}
