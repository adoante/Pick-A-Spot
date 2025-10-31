<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();

	import { onMount } from "svelte";
	import { loadGoogle } from "$lib/loadGoogle";

	let ready = false;

	onMount(async () => {
		try {
			await loadGoogle(["places"]);
			ready = true;
		} catch (err) {
			console.error("Failed to load Google Maps", err);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
{@render children?.()}
