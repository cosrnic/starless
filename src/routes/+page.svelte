<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import { currentUser } from '$lib/pocketbase';
	import CreateLink from '$lib/components/CreateLink.svelte';
	import Notifications from '$lib/components/Notifications.svelte';
</script>

<main class="flex h-screen flex-col items-center justify-center gap-2">
	<div class="text-center">
		<h1 class="text-2xl font-bold text-[#ffca5b]">Starless</h1>
		<h2 class="text-xl font-semibold">
			An <span class="text-accent">Ad-Free</span> URL Shortener
		</h2>
		<p class="text-lg">
			Enter your <span class="text-accent">URL</span> below!
		</p>
	</div>
	{#if $currentUser}
		<CreateLink />
	{:else}
		<Login />
	{/if}
	<Notifications />
</main>
