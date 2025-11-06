<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import DarkModeToggle from "$lib/components/DarkModeToggle.svelte";

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

<main
	class="md:mx-auto min-h-screen max-w-4xl md:py-10 py-5 mx-5 flex flex-col"
>
	<span class="flex flex-row items-center justify-between">
		<a href="/">
			<h1 class="text-2xl font-semibold">Pick a Spot!</h1>
		</a>
		<DarkModeToggle />
	</span>
	{@render children?.()}
</main>
