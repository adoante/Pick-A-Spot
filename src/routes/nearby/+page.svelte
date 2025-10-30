<script lang="ts">
	import PlaceDetailsCard from "$lib/components/PlaceDetailsCard.svelte";
	import { getCurrentPositionAsync } from "$lib/utils";

	let nearbyPlaces: { id: string }[] = $state([]);
	let numberPlaces: number = $state(1);
	let radiusPlaces: number = $state(1000);

	async function loadNearby() {
		const position = await getCurrentPositionAsync();
		const { latitude, longitude } = position.coords;

		const res = await fetch("/api/nearby", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				lat: latitude,
				lng: longitude,
				cnt: numberPlaces,
				radius: radiusPlaces,
			}),
		});

		if (res.ok) {
			const data = await res.json();
			nearbyPlaces = data.places;
		} else {
			console.error("Failed to fetch nearby places");
		}
	}
</script>

<button onclick={loadNearby} class="btn">Find Nearby Places</button>
<input type="number" bind:value={numberPlaces} min="1" max="20" />
<input type="number" bind:value={radiusPlaces} min="1000" max="50000" />

{#if nearbyPlaces.length > 0}
	<p>Found: {numberPlaces} places in a {radiusPlaces} radius.</p>
	<div class="cards">
		{#each nearbyPlaces as place}
			<p>{place.id}</p>
			<PlaceDetailsCard id={place.id} />
		{/each}
	</div>
{:else}
	<p>No places loaded yet.</p>
{/if}
