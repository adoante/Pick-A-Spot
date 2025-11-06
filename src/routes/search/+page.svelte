<script lang="ts">
	import { goto } from "$app/navigation";
	import { getCurrentPositionAsync, milesToMeters } from "$lib/utils";
	import PlaceDetailsCard from "$lib/components/PlaceDetailsCard.svelte";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Button } from "$lib/components/ui/button";

	let isOpen: boolean = $state(false);
	let input: string = $state("pizza");
	let radius: number = $state(1); // user input in miles
	let message: string | null = $state(
		"Powered by Google's Places API and Places UI Kit!",
	);

	let latitude: number;
	let longitude: number;

	async function loadNearby() {
		message = "Loading spots...";

		try {
			const position = await getCurrentPositionAsync();
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;

			const radiusMeters = milesToMeters(radius);

			const res = await fetch("/api/text", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					input,
					radius: radiusMeters,
					lat: latitude,
					lng: longitude,
					isOpen: isOpen,
				}),
			});

			if (res.ok) {
				const data = await res.json();

				message = "Redirecting...";

				goto("/pick", { state: data });
			} else {
				console.error("Failed to fetch nearby spots");
				message = "❌ Failed to fetch nearby spots.";
			}
		} catch (err) {
			console.error("Geolocation or fetch error:", err);
			message = "⚠️ Could not get location or fetch spots.";
		}
	}
</script>

<main class="space-y-5 py-5 flex flex-col">
	<!-- Search Controls -->
	<span class="flex flex-row space-x-3 items-center">
		<Label for="isOpen" class="p-0">Only Open Spots</Label>
		<Checkbox bind:checked={isOpen} id="isOpen" />
	</span>
	<Label for="search">Search</Label>
	<Input
		type="search"
		bind:value={input}
		class="border"
		placeholder="e.g. pizza"
	/>

	<Label for="radius">Distance (miles)</Label>
	<Input
		type="number"
		bind:value={radius}
		min="0.1"
		max="30"
		step="0.1"
		placeholder="Radius (mi)"
	/>

	<Button onclick={loadNearby} class="cursor-pointer">
		Search Nearby Spots
	</Button>

	<p class="text-center italic">{message}</p>

	<PlaceDetailsCard id="ChIJuxwr-xl33IAREkcGhGTb0zI" />
</main>
