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

<!-- Animated SVG background -->
<div class="fixed inset-0 pointer-events-none opacity-40">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="100%"
		height="100%"
		style="position:absolute; inset:0; mix-blend-mode:overlay;"
	>
		<defs>
			<pattern
				id="animated-grid"
				width="40"
				height="40"
				patternUnits="userSpaceOnUse"
			>
				<rect
					width="40"
					height="40"
					fill="none"
					stroke="var(--foreground)"
					stroke-width="0.05"
				/>
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#animated-grid)" />
	</svg>
</div>

<nav
	class="fixed top-0 w-full flex items-center justify-center z-10 bg-background/20 backdrop-blur-sm p-5"
>
	<span
		class="flex flex-row md:min-w-7xl md:w-min w-full justify-between order"
	>
		<a href="/">
			<h1 class="text-2xl font-semibold">Pick a Spot!</h1>
		</a>
		<DarkModeToggle />
	</span>
</nav>
<main
	class="relative z-5 md:mx-auto min-h-screen max-w-4xl md:py-10 py-5 mx-5 flex flex-col my-15"
>
	{@render children?.()}
</main>
