import PocketBase from 'pocketbase';

import { writable } from 'svelte/store';

export const pb = new PocketBase('http://127.0.0.1:8090');

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.model);
});

export async function login() {
	const userData = await pb
		.collection('users')
		.authWithOAuth2({ provider: 'discord', scopes: ['identify'] });
	await pb.collection('users').update(userData.record.id, {
		avatar: userData.meta?.avatarUrl,
		discord_id: userData.meta?.id,
		accent_color: userData.meta?.rawUser.accent_color,
		links_limit: 15,
	});
}

export function logout() {
	pb.authStore.clear();
}

export async function createLink(owner: string, url: string) {
	if (url == '') {
		throw new Error('Link must have a URL');
	}

	await pb.collection('links').create({
		owner,
		url,
	});
}
