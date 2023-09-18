import { redirect } from '@sveltejs/kit';
import type { PageLoad, PageLoadEvent } from './$types';
import { pb } from '$lib/pocketbase';

export const load = (async (event: PageLoadEvent) => {
	const slug = event.params.slug;

	let dbResult;

	try {
		dbResult = await pb.collection('links').getOne(slug);
	} catch (e) {
		console.log(e);
		throw redirect(308, '/');
	}

	throw redirect(308, dbResult.url);
}) satisfies PageLoad;
