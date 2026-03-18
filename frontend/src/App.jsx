import { Outlet } from 'react-router-dom';
import { Header } from './components/layout/Header.jsx';
import { ScrollToTop } from './components/ScrollToTop.jsx';

export default function App() {
	return (
		<>
			<ScrollToTop />
			<Header />
			<Outlet />
		</>
	);
}
