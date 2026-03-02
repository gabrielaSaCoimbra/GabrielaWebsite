import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Home } from './pages/Home.jsx';
import { About } from './pages/About.jsx';
import { Projects } from './pages/Projects.jsx';
import { Contacts } from './pages/Contacts.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';
import { ProjectSlug } from './pages/ProjectSlug';
import { Archive } from './pages/Archive';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				path: '/',
				element: <Home />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/projects',
				element: <Projects />,
			},
			{
				path: '/projects/:slug',
				element: <ProjectSlug />,
			},
			{
				path: '/archive',
				element: <Archive />,
			},
			{
				path: '/contact',
				element: <Contacts />,
			},
			{
				path: '*',
				element: <ErrorPage />,
			},
		],
	},
]);
