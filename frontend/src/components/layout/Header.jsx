// src/components/layout/Header.jsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
	{ to: '/projects', label: 'Projects' },
	{ to: '/archive', label: 'Archive' },
	{ to: '/about', label: 'About' },
	{ to: '/contact', label: 'Contacts' },
];

export function Header() {
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const navRef = useRef(null);

	// fecha ao mudar de página (evita “bugs”/estados presos)
	useEffect(() => {
		setOpen(false);
	}, [location.pathname, location.search]);

	// FECHAR AO CLICAR FORA
	useEffect(() => {
		if (!open) return;

		const onPointerDown = e => {
			const el = navRef.current;
			if (!el) return;

			// se clicou dentro do menu, não fecha
			if (el.contains(e.target)) return;

			setOpen(false);
		};

		// pointerdown é mais “rápido”/consistente que click
		window.addEventListener('pointerdown', onPointerDown);
		return () => window.removeEventListener('pointerdown', onPointerDown);
	}, [open]);

	const items = useMemo(() => navItems, []);

	return (
		<header className='fixed inset-x-0 top-0 z-50 pointer-events-none'>
			<div className='flex justify-center mt-6'>
				<motion.nav
					ref={navRef}
					initial={false}
					animate={open ? 'open' : 'closed'}
					className='pointer-events-auto lg:w-[350px] lg:max-w-[92vw] w-full mx-6 md:mx-0 overflow-hidden bg-[rgba(0,0,0,0.04)] backdrop-blur-[50px]'
					variants={{
						closed: { height: 45 },
						open: { height: 208 },
					}}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				>
					{/* Top bar */}
					<div className='h-11 px-5 flex items-center justify-between'>
						<NavLink to='/' className='text-nav  text-black/80  transition duration-500'>
							Gabriela Sá Coimbra
						</NavLink>

						<button type='button' onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} className='relative h-10 w-7 grid place-items-center '>
							{/* 2 linhas -> 1 linha (igual ao exemplo) */}
							<motion.span
								className='absolute block h-[1.5px] w-6 bg-black/80'
								variants={{
									closed: { y: -3, opacity: 1 },
									open: { y: 0, opacity: 1 },
								}}
								transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
							/>
							<motion.span
								className='absolute block h-[1.5px] w-6 bg-black/80'
								variants={{
									closed: { y: 3, opacity: 1 },
									open: { y: 0, opacity: 0 }, // desaparece
								}}
								transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
							/>
						</button>
					</div>

					<div className='px-5 pb-5'>
						<AnimatePresence initial={false}>
							{open && (
								<motion.div key='menu' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }} className='pt-5 '>
									<div className='flex flex-col items-center '>
										{items.map(it => (
											<NavLink
												key={it.to}
												to={it.to}
												className={({ isActive }) =>
													[
														'w-full py-2 text-center text-nav leading-none transition',
														isActive ? 'text-black/80  hover:bg-[rgba(0,0,0,0.1)] transition duration-500' : 'text-black/80  hover:bg-[rgba(0,0,0,0.1)] transition duration-500',
													].join(' ')
												}
											>
												{it.label}
											</NavLink>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</motion.nav>
			</div>
		</header>
	);
}
