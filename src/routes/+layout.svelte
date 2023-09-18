<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import '../app.css';
	import '@fontsource-variable/comfortaa';

	let accentColor = $currentUser?.accent_color.toString(16) ?? '038ff5';

	function setAccent() {
		if (document) {
			(document.querySelector(':root')! as HTMLElement).style.setProperty(
				'--accent',
				`#${accentColor}`
			);
		}
	}

	onMount(async () => {
		currentUser.subscribe((user) => {
			accentColor = user?.accent_color.toString(16) ?? '038ff5';
			setAccent();
		});
		setAccent();
	});
</script>

<svelte:head>
	<title>Starless - A URL Shortener</title>
</svelte:head>

<slot />
