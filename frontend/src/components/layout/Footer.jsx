export function Footer() {
	return (
		<footer className='mt-24 border-t border-border'>
			<div className='container-page py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
				<div className='flex gap-10 text-nav uppercase text-fg/70'>
					<span>V.SK</span>
					<span>VINCENT SCHWENK</span>
					<span>ART&DESIGN</span>
				</div>

				<div className='flex gap-10 text-nav uppercase'>
					<a className='text-accent hover:opacity-80 transition' href='#'>
						QUICK PORTFOLIO
					</a>
					<a className='text-accent hover:opacity-80 transition' href='#'>
						IMPRESSUM
					</a>
				</div>
			</div>
		</footer>
	);
}
