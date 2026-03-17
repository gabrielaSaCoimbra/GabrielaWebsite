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
			<div className='mx-[5rem] my-[1rem] py-2 px-8  flex items-center justify-between   '>
				<NavLink to='/' className='text-nav hover:text-fg transition '>
					Gabriela Sá Coimbra
				</NavLink>

				<div></div>

				<nav className='flex items-center gap-6 text-nav '>
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
