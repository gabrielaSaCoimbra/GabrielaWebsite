import { createClient } from '@sanity/client';

const sanityClient = createClient({
	projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
	dataset: import.meta.env.VITE_SANITY_DATASET,
	apiVersion: '2024-10-01',
	useCdn: true,
});

export default sanityClient;
