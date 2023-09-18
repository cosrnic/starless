<script lang="ts">
	import { page } from '$app/stores';
	import { currentUser, pb } from '$lib/pocketbase';
	import { resolvePath } from '@sveltejs/kit';
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
			if (e.data.code == 400) {
				error.set(e.data.message);
			} else {
				error.set('Unknown Error');
			}
			url = '';
			return;
		}

		copy.set(`${$page.url.href}${dbStuff.id}`);
		url = '';
	}
</script>

<div class="flex w-[300px] flex-col gap-2">
	<form on:submit|preventDefault={createLink}>
		<div class="flex w-full flex-row gap-2">
			<input
				bind:value={url}
				required
				placeholder="Enter URL"
				class="w-full rounded-xl border-2 border-accent bg-transparent p-2 outline-none ring-0 transition-all duration-200 ease-in-out focus:bg-white/20"
			/>
			<button
				type="submit"
				disabled={url == ''}
				class="rounded-xl bg-accent px-2 py-1 transition-all duration-200 ease-in-out disabled:bg-gray-500"
				>Create</button
			>
		</div>
	</form>
	{#if $error}
		<div
			class="relative h-fit w-full rounded-xl border-2 border-red-500 text-red-500 transition-all duration-200 ease-in-out"
		>
			<button
				on:click={() => {
					error.set('');
				}}
				class="absolute right-2 top-0 hover:text-red-500">x</button
			>
			<p class="p-2">
				Error:
				<span class="rounded-xl bg-neutral-800 px-2 py-1 text-red-500"
					>{$error}</span
				>
			</p>
		</div>
	{/if}
	{#if $copy}
		<div
			class="relative h-fit w-full rounded-xl border-2 border-green-500 text-green-500 transition-all duration-200 ease-in-out"
		>
			<button
				on:click={() => {
					copy.set('');
				}}
				class="absolute right-2 top-0 hover:text-red-500">x</button
			>
			<button
				on:click={() => {
					navigator.clipboard.writeText($copy);
				}}
				class="p-2"
			>
				Your Shortened URL is
				<span class="rounded-xl bg-neutral-800 px-2 py-1 text-accent"
					>{$copy}</span
				>!
			</button>
		</div>
	{/if}
</div>
