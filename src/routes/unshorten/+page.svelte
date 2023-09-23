<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import Notifications from '$lib/components/Notifications.svelte';
	import { writable } from 'svelte/store';
	import { toast } from '$lib/notification';
	import { PUBLIC_SHORT_URL } from '$env/static/public';
	import type { RecordModel } from 'pocketbase';

	let url: string = '';
	let error = writable<string>();
	let copy = writable<string>();

	async function getOriginalURL() {
		let dbStuff: any;

		const segments = url.split('/');
		const lastSegment = segments[segments.length - 1];

		try {
			dbStuff = await pb.collection('links').getFullList();
		} catch (e: any) {
			console.log(e.data);
			error.set(e.data.code + ': ' + e.data.message);

			url = '';
			toast($error, 'error');
			return;
		}

		let found = false;

		url = '';

		dbStuff.forEach((item: RecordModel) => {
			if (item.id === lastSegment) {
				copy.set(item.url);
				try {
					navigator.clipboard.writeText($copy);
					toast('Coped original URL to your clipboard!', 'copy');
				} catch (e) {
					toast('unable to copy ' + $copy, 'error');
				}
				found = true;
			}
		});

		if (!found) toast('No URL with that ID found!', 'error');

		found = false;
	}
</script>

<main class="flex h-screen flex-col items-center justify-center gap-2">
	<div class="text-center">
		<h1 class="text-2xl font-bold text-[#ffca5b]">Starless</h1>
		<h2 class="text-xl font-semibold">
			An <span class="text-accent">Ad-Free</span> URL Shortener
		</h2>
		<p class="text-lg">
			Unshorten a <span class="text-accent">URL</span> below!
		</p>
	</div>

	<div class="flex w-[400px] flex-col gap-2">
		<form on:submit|preventDefault={getOriginalURL}>
			<div class="relative w-full flex-row">
				<button
					type="submit"
					disabled={url == ''}
					class="absolute right-3 top-2/4 grid h-5 w-5 -translate-y-2/4 place-items-center text-accent disabled:text-white/5"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="auto"
						viewBox="0 0 448 512"
						><path
							fill="currentcolor"
							d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
						/></svg
					>
				</button>
				<input
					bind:value={url}
					required
					class="peer h-full w-full rounded-2xl border border-white/5 bg-transparent px-3 py-2.5 !pr-9 font-bold text-white outline-none transition-all placeholder:text-white/20 hover:bg-white/10 focus:bg-white/10"
					placeholder={PUBLIC_SHORT_URL + '/k3w9km8sxbn3v00'}
				/>
			</div>
		</form>
	</div>

	<Notifications />
</main>
