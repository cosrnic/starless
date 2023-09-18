<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Login from '$lib/components/Login.svelte';
	import Starless from '$lib/components/Starless.svelte';
	import { currentUser, logout, pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import CreateLink from '$lib/components/CreateLink.svelte';
</script>

<main class="flex h-screen flex-col items-center justify-center">
	<Header />
	{#if $currentUser}
		<!-- <Starless accent={true} className="h-24 w-24" />
		<p>Signed in as {$currentUser.username}</p>
		<p>id: {$currentUser.discord_id}</p>
		<p>
			accent_color: {$currentUser.accent_color}
		</p>
		<p>
			Links Limit: {$currentUser.links_limit}
		</p>
		<p>
			Banned: {$currentUser.banned}
		</p>
		<img src={$currentUser.avatar} alt="pfp" />
		<button on:click={logout}>sign out</button> -->
		<CreateLink />
	{:else}
		<Login />
	{/if}
</main>
