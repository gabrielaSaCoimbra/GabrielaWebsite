import { useEffect, useState } from 'react';
import sanityClient from '../lib/sanity.client';
import { PROJECT_BY_SLUG_QUERY } from '../lib/sanity.queries';

export function useProjectBySlug(slug) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!slug) return;

		setLoading(true);
		sanityClient
			.fetch(PROJECT_BY_SLUG_QUERY, { slug })
			.then(res => setData(res))
			.finally(() => setLoading(false));
	}, [slug]);

	return { data, loading };
}
