import { useEffect, useState } from 'react';
import sanityClient from '../lib/sanity.client';
import { MORE_WORK_SAME_CATEGORY_QUERY } from '../lib/sanity.queries';

export function useMoreWorkSameCategory({ slug, category }) {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let alive = true;
		if (!slug || !category) return;

		(async () => {
			setLoading(true);
			try {
				const res = await sanityClient.fetch(MORE_WORK_SAME_CATEGORY_QUERY, { slug, category });
				if (!alive) return;
				setItems(res || []);
			} catch (e) {
				console.error('More work fetch failed', e);
				if (alive) setItems([]);
			} finally {
				if (alive) setLoading(false);
			}
		})();

		return () => {
			alive = false;
		};
	}, [slug, category]);

	return { items, loading };
}
