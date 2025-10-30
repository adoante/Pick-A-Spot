<script lang="ts">
	import PlaceDetailsCard from "$lib/components/PlaceDetailsCard.svelte";
	import { getCurrentPositionAsync } from "$lib/utils";

	let nearbyPlaces: { id: string }[] = $state([]);
	let nextPageToken: string = $state("");
	let input: string = $state("pizza");
	let radius: number = $state(1);
	let latitude: number;
	let longitude: number;

	async function loadNearby() {
		const position = await getCurrentPositionAsync();
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		const res = await fetch("/api/text", {
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
			nearbyPlaces = data.places;
			nextPageToken = data.nextPageToken;
		} else {
			console.error("Failed to fetch nearby places");
		}
	}

	async function loadNextPage() {
		const res = await fetch("/api/text/next", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				input: input,
				radius: radius,
				lat: latitude,
				lng: longitude,
				token: nextPageToken,
			}),
		});

		if (res.ok) {
			const data = await res.json();
			nearbyPlaces = data.places;
			nextPageToken = data.nextPageToken;
		} else {
			console.error("Failed to fetch nearby places");
		}
	}
</script>

<button onclick={loadNearby}>Search Nearby Places</button>
<input type="search" bind:value={input} class="border" />
<input type="number" bind:value={radius} min="1" max="50000" />

{#if nearbyPlaces.length > 0}
	<div class="cards">
		{#each nearbyPlaces as place}
			<PlaceDetailsCard id={place.id} />
		{/each}
	</div>
{:else}
	<p>No places loaded yet.</p>
{/if}

<button onclick={loadNextPage}>Next Set</button>

<style>
	.cards {
		display: flex;
		direction: row;
		padding: 10px;
	}
</style>
