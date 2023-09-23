<script lang="ts">
	import { PUBLIC_URL } from '$env/static/public';
	import { toast } from '$lib/notification';
	import { currentUser, pb } from '$lib/pocketbase';
	import { writable } from 'svelte/store';

	let url: string = '';
	let error = writable<string>();
	let copy = writable<string>();

	async function createLink() {
		let dbStuff: any;

		if (!url.startsWith('https://')) {
			url = 'https://' + url;
		}

		try {
			dbStuff = await pb.collection('links').create({
				owner: $currentUser!.id,
				url,
			});
		} catch (e: any) {
			console.log(e.data);
			error.set(e.data.code + ': ' + e.data.message);

			url = '';
			toast($error, 'error');
			return;
		}

		copy.set(`${PUBLIC_URL}/${dbStuff.id}`);
		try {
			navigator.clipboard.writeText($copy);
			toast('Copied to your clipboard!', 'copy');
		} catch (e) {
			url = `unable to copy, ${$copy}`;
			return;
		}

		url = '';
	}
</script>

<div class="flex w-[400px] flex-col gap-2">
	<form on:submit|preventDefault={createLink}>
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
				placeholder="https://example.com"
			/>
		</div>
	</form>
</div>
