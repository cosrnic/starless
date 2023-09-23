<script>
	import { currentUser, logout } from '$lib/pocketbase';
	import Starless from './Starless.svelte';
</script>

<div class="fixed top-0 flex h-32 w-full justify-between p-2 md:h-36 md:p-4">
	<a
		href="/"
		class="group flex h-full w-fit flex-row gap-x-4 rounded-2xl border border-white/5 p-4 transition-all duration-200 ease-in-out hover:bg-white/5"
	>
		<Starless accent={true} className="w-full h-full" />
		<div
			class="hidden h-full flex-col items-center justify-center transition-all duration-200 ease-in-out group-hover:flex"
		>
			<h1 class="text-xl font-bold text-[#ffca5b]">Starless</h1>
			<a
				href="/unshorten"
				class="text-lg font-semibold text-accent transition-all duration-200 ease-in-out hover:text-xl"
				>Unshorten</a
			>
		</div>
	</a>
	{#if $currentUser}
		<div
			class="group flex h-full w-fit flex-row gap-x-4 rounded-2xl border border-white/5 p-4 transition-all duration-200 ease-in-out hover:bg-white/5"
		>
			<div
				class="flex h-full flex-col items-center justify-center transition-all duration-200 ease-in-out group-hover:flex md:hidden"
			>
				<a class="text-xl font-bold text-[#ffca5b]" href="/profile">
					{$currentUser.username}
				</a>
				<button
					on:click={logout}
					class="text-lg font-semibold text-accent transition-all duration-200 ease-in-out hover:text-xl"
					>Logout</button
				>
			</div>
			<a class="h-full w-full" href="/profile">
				<img
					src={$currentUser.avatar}
					alt="pfp"
					class="h-full w-full rounded-2xl"
				/>
			</a>
		</div>
	{/if}
</div>
