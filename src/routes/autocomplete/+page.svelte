<script lang="ts">
	import PlaceDetailsCard from "$lib/components/PlaceDetailsCard.svelte";
	import { getCurrentPositionAsync } from "$lib/utils";

	let nearbyPlaces: { placePrediction: { placeId: string } }[] = $state([]);
	let input: string = $state("pizza");
	let radius: number = $state(1);

	async function loadNearby() {
		const position = await getCurrentPositionAsync();
		const { latitude, longitude } = position.coords;

		const res = await fetch("/api/autocomplete", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				input: input,
				radius: radius,
				lat: latitude,
				lng: longitude,
			}),
		});

		if (res.ok) {
			const data = await res.json();
			nearbyPlaces = data.suggestions;
		} else {
			console.error("Failed to fetch nearby places");
		}
	}
</script>

<button onclick={loadNearby} class="btn">Search Nearby Places</button>
<input type="search" bind:value={input} />
<input type="number" bind:value={radius} min="1" max="50000" />

{#if nearbyPlaces.length > 0}
	<div class="cards">
		{#each nearbyPlaces as placeSuggestions}
			<p>{placeSuggestions.placePrediction.placeId}</p>
			<PlaceDetailsCard id={placeSuggestions.placePrediction.placeId} />
		{/each}
	</div>
{:else}
	<p>No places loaded yet.</p>
{/if}
