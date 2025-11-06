<script lang="ts">
	import { onMount } from "svelte";
	import PlaceDetailsCard from "$lib/components/PlaceDetailsCard.svelte";
	import { Button } from "$lib/components/ui/button";
	import { goto } from "$app/navigation";

	let winner: string = $state("");
	let round: number = $state(0);
	let message = $state<string | null>(null);

	onMount(() => {
		const state = history.state?.["sveltekit:states"];
		console.log(state);
		winner = state.result;
		round = state.round;
	});

	function startOver() {
		goto("/search");
	}
</script>

<main class="space-y-5 py-5 flex flex-col">
	{#if message}
		<p class="text-center italic">{message}</p>
	{/if}

	{#if winner}
		<div class="mt-10 space-y-4 text-center">
			<h2 class="text-xl font-bold">🎉 Final Choice</h2>
			<PlaceDetailsCard id={winner} />
			<p class="text-gray-500 text-sm">(Winner after {round} rounds)</p>
			<Button onclick={startOver} class="cursor-pointer w-full">
				Start Over
			</Button>
		</div>
	{/if}
</main>
