/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1.25rem',
				sm: '1.5rem',
				lg: '2.5rem',
				xl: '3rem',
			},
		},
		extend: {
			maxWidth: {
				site: '1440px',
			},
			colors: {
				bg: 'rgb(var(--bg) / <alpha-value>)',
				fg: 'rgb(var(--fg) / <alpha-value>)',
				muted: 'rgb(var(--muted) / <alpha-value>)',
				border: 'rgb(var(--border) / <alpha-value>)',
				accent: 'rgb(var(--accent) / <alpha-value>)',
			},
			fontFamily: {
				telegraf: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				h1: ['clamp(2.25rem, 1.5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
				lead: ['clamp(1.25rem, 4.2vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
				lead2: ['clamp(1.25rem, 4.5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
				nav: ['1.1rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.05em' }],
				navLight: ['1.1rem', { lineHeight: '1.2', fontWeight: '400', letterSpacing: '-0.05em' }],
				label: ['0.7rem', { lineHeight: '1.2', letterSpacing: '0.08em' }],
			},
		},
	},
	plugins: [],
};
