<script lang="ts">
	import { slide } from 'svelte/transition';
	import { notifications } from '$lib/notification';
</script>

{#if $notifications}
	<div class="fixed right-4 top-36 h-fit w-fit">
		{#each $notifications as notification}
			<div
				class="m-2 h-full w-full items-center justify-center gap-4 rounded-xl border-white/5 p-2"
				class:bg-red-500={notification.type == 'error'}
				class:bg-accent={notification.type == 'copy'}
				transition:slide={{ duration: 200 }}
			>
				{notification.message}
			</div>
		{/each}
	</div>
{/if}
