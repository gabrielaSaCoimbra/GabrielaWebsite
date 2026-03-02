import { useEffect, useState } from 'react';
import sanityClient from '../lib/sanity.client';
import { ARCHIVE_INDEX_QUERY } from '../lib/sanity.queries.js';

export function useArchiveIndex() {
	const [data, setData] = useState({ ambient: [], projects: [] });
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let alive = true;

		(async () => {
			try {
				const res = await sanityClient.fetch(ARCHIVE_INDEX_QUERY);
				if (!alive) return;

				setData({
					ambient: res?.ambient || [],
					projects: res?.projects || [],
				});
			} catch (e) {
				console.error('Archive index fetch failed', e);
			} finally {
				if (alive) setLoading(false);
			}
		})();

		return () => {
			alive = false;
		};
	}, []);

	return { data, loading };
}
