<script lang="ts">
	import PlaceDetailsCard from "$lib/components/PlaceDetailsCard.svelte";
	import { Button } from "$lib/components/ui/button";
	import { onMount } from "svelte";
	import * as Drawer from "$lib/components/ui/drawer";
	import { goto } from "$app/navigation";

	let nearbyPlaces = $state<{ id: string }[]>([]);
	let nextPageToken = $state<string | null>(null);
	let message = $state<string | null>(null);

	let maybePlaces = $state<string[]>([]);
	let currPlace = $state(0);
	let numPlaces = $derived(nearbyPlaces.length);
	let finalPlace: string | null = $state(null);
	let notFound = $state(false);
	let round = $state(1);

	onMount(() => {
		const state = history.state?.["sveltekit:states"];
		nearbyPlaces = state.places;
		nextPageToken = state.nextPageToken;
	});

	function handleRoundEnd() {
		if (maybePlaces.length === 0) {
			message = "😅 No 'Maybe' spots left. Start over!";
			notFound = true;
			return;
		}

		// 🏁 If only one place remains — finalize it
		if (maybePlaces.length === 1) {
			finalPlace = maybePlaces[0];
			message = "🎯 We have a winner!";
			const data = { result: finalPlace, round: round };
			goto("/results", { state: data });
		}

		// 🔁 Otherwise, start next round with maybes
		nearbyPlaces = maybePlaces.map((id) => ({ id }));
		numPlaces = nearbyPlaces.length;
		currPlace = 0;
		maybePlaces = [];
		round += 1;

		message = `Round ${round - 1} done. Starting Round ${round} with ${numPlaces} places!`;
	}

	function loadNextPlace(maybe = false) {
		if (maybe && nearbyPlaces[currPlace]) {
			maybePlaces = [...maybePlaces, nearbyPlaces[currPlace].id];
		}

		if (currPlace + 1 < numPlaces) {
			currPlace += 1;
			return;
		}

		handleRoundEnd();
	}

	function startOver() {
		goto("/search");
	}
</script>

<main class="space-y-5 py-5 flex flex-col">
	{#if message}
		<p class="text-center italic">{message}</p>
	{/if}

	{#if !notFound}
		{#if !finalPlace && nearbyPlaces.length > 0}
			<p class="text-center">
				Round {round} — {currPlace + 1}/{numPlaces}
			</p>
		{/if}

		{#if !finalPlace && nearbyPlaces.length > 0 && currPlace < nearbyPlaces.length}
			<PlaceDetailsCard id={nearbyPlaces[currPlace].id} />
		{/if}

		{#if !finalPlace && nearbyPlaces.length > 0}
			<span class="flex flex-row gap-5 justify-center px-2">
				<Button
					onclick={() => loadNextPlace(false)}
					class="cursor-pointer w-1/2 bg-red-400 hover:bg-red-500"
				>
					Nope
				</Button>
				<Button
					onclick={() => loadNextPlace(true)}
					class="cursor-pointer w-1/2 bg-green-400 hover:bg-green-500"
				>
					Maybe
				</Button>
			</span>
		{/if}
	{/if}

	{#if notFound}
		<div class="flex flex-1 justify-center items-center">
			<Button onclick={startOver} class="cursor-pointer"
				>Start Over</Button
			>
		</div>
	{/if}
</main>
