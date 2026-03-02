import { NavLink } from 'react-router-dom';

const navItems = [
	{ to: '/projects', label: 'Projects' },
	{ to: '/archive', label: 'Archive' },
	{ to: '/about', label: 'About' },
	{ to: '/contact', label: 'Contact' },
];

export function Header() {
	return (
		<header className='fixed inset-x-0 top-0 z-50 text-black'>
			<div className='container-page  px-[7rem] py-[2rem] flex items-center justify-between  '>
				<NavLink to='/' className='text-nav hover:text-fg transition '>
					Gabriela Sá Coimbra
				</NavLink>

				<nav className='flex items-center gap-6 text-nav'>
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
