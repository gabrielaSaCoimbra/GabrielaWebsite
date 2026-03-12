import { NavLink } from 'react-router-dom';

const navItems = [
	{ to: '/projects', label: 'Projects' },
	{ to: '/archive', label: 'Archive' },
	{ to: '/about', label: 'About' },
	{ to: '/contact', label: 'Contact' },
];

export function Header() {
	return (
		<header className='fixed inset-x-0 top-0 z-50 '>
			<div
				className='container-page  mx-[7rem] my-[2rem] p-2 flex items-center justify-between bg-[rgba(160, 160, 160, 0.4)] 
							backdrop-blur-2xl text-black '
			>
				<NavLink to='/' className='text-nav hover:text-fg transition uppercase'>
					Gabriela Sá Coimbra
				</NavLink>

				<nav className='flex items-center gap-6 text-nav uppercase'>
					{navItems.map(item => (
						<NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? '' : '')}>
							{item.label}
						</NavLink>
					))}
				</nav>
			</div>
		</header>
	);
}
