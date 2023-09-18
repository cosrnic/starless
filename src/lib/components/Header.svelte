<script>
	import { currentUser, login, logout } from '$lib/pocketbase';
	import Starless from './Starless.svelte';
</script>

<div class="fixed top-0 h-32 w-full px-3 py-2 md:h-40 md:px-32 md:py-8">
	<div
		class="flex h-full w-full flex-row items-center justify-between rounded-xl border border-white/30 bg-white/20 p-2 text-lg font-semibold text-[#ffca5b] drop-shadow-md backdrop-blur-sm md:text-xl"
	>
		<a
			href="/"
			class="flex h-20 w-20 flex-row items-center justify-center gap-4 rounded-full border border-white/20 p-1 drop-shadow-md transition-all duration-200 ease-in-out hover:bg-white/20 hover:drop-shadow-lg"
		>
			<Starless accent={false} className="aspect-square p-0.5 rounded-full" />
		</a>
		{#if $currentUser}
			<button
				on:click={logout}
				class="flex h-20 w-20 flex-row items-center justify-center gap-4 rounded-full border border-white/20 p-1 drop-shadow-md transition-all duration-200 ease-in-out hover:bg-white/20 hover:drop-shadow-lg"
			>
				<img src={$currentUser.avatar} alt="pfp" class="rounded-full" />
			</button>
		{:else}
			<button
				on:click={login}
				class="hover:drop-shadow-lgdrop-shadow-md flex h-20 w-20 flex-row items-center justify-center gap-4 rounded-xl border border-white/20 p-1 transition-all duration-200 ease-in-out hover:bg-white/20"
			>
				Login
			</button>
		{/if}
	</div>
</div>
