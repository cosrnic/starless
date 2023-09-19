<script lang="ts">
	import { login } from '$lib/pocketbase';
</script>

<button
	on:click={login}
	class="rounded-2xl border border-white/5 px-3 py-2 text-xl font-semibold transition-all duration-200 ease-in-out hover:bg-white/5"
	>Login with <span class="text-accent">Discord</span></button
>
