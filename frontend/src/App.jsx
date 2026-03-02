import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header.jsx';

export default function App() {

	return (
		<>
			<Header />

			<Outlet />
		</>
	);
}
