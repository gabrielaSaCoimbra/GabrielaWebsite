import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.jsx';
import './index.css';
import 'lenis/dist/lenis.css';
import { LenisProvider } from './components/provider/LenisProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<LenisProvider>
			<RouterProvider router={router} />
		</LenisProvider>
	</React.StrictMode>,
);
