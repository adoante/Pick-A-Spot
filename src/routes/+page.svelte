<script lang="ts">
	import PlaceDetailsCard from "$lib/components/PlaceDetailsCard.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { getCurrentPositionAsync } from "$lib/utils";
	import * as Drawer from "$lib/components/ui/drawer";
	import DarkModeToggle from "$lib/components/DarkModeToggle.svelte";

	let nearbyPlaces: { id: string }[] = $state([]);
	let nextPageToken: string = $state("");
	let input: string = $state("pizza");
	let radius: number = $state(1); // user input in miles
	let numPlaces: number = $state(0);
	let currPlace: number = $state(0);
	let maybePlaces: string[] = $state([]);
	let message: string | null = $state(
		"Powered by Google's Places API and Places UI Kit!",
	);
	let notFound: boolean = $state(false);

	let latitude: number;
	let longitude: number;
	let round: number = $state(1);
	let finalPlace: string | null = $state(null); // 🏁 final winner

	function milesToMeters(miles: number): number {
		return miles * 1609.34;
	}

	async function loadNearby() {
		// reset all state
		round = 1;
		maybePlaces = [];
		currPlace = 0;
		finalPlace = null;
		message = "Loading spots...";
		notFound = false;

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
				}),
			});

			if (res.ok) {
				const data = await res.json();
				nearbyPlaces = data.places;
				nextPageToken = data.nextPageToken;
				numPlaces = nearbyPlaces.length;
				currPlace = 0;
				message = `Found ${numPlaces} nearby "${input}" spots within ${radius} miles.`;
			} else {
				console.error("Failed to fetch nearby spots");
				message = "❌ Failed to fetch nearby spots.";
			}
		} catch (err) {
			console.error("Geolocation or fetch error:", err);
			message = "⚠️ Could not get location or fetch spots.";
		}
	}

	function loadNextPlace(maybe = false) {
		// Add to "maybe" list if user chose so
		if (maybe && nearbyPlaces[currPlace]) {
			maybePlaces = [...maybePlaces, nearbyPlaces[currPlace].id];
		}

		// Move to next place if there’s more
		if (currPlace + 1 < numPlaces) {
			currPlace += 1;
			return;
		}

		// End of this round → evaluate next step
		handleRoundEnd();
	}

	function startOver() {
		nearbyPlaces = [];
		finalPlace = null;
		currPlace = 0;
		numPlaces = 0;
		round = 1;
		maybePlaces = [];
		message = null;
		notFound = false;
	}

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
			return;
		}

		// 🔁 Otherwise, start next round with maybes
		nearbyPlaces = maybePlaces.map((id) => ({ id }));
		numPlaces = nearbyPlaces.length;
		currPlace = 0;
		maybePlaces = [];
		round += 1;

		message = `Round ${round - 1} done. Starting Round ${round} with ${numPlaces} places!`;
	}
</script>

<main class="space-y-5 py-5 max-w-4xl mx-5 flex flex-col md:mx-auto">
	<span class="flex flex-row items-center justify-between">
		<h1 class="text-2xl font-semibold">Pick a Spot!</h1>
		<DarkModeToggle />
	</span>

	<!-- Search Controls -->
	{#if !finalPlace && nearbyPlaces.length === 0}
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
	{/if}

	<!-- Message Banner -->
	{#if message}
		<p class="text-center italic">{message}</p>
	{/if}

	{#if !finalPlace && nearbyPlaces.length === 0}
		<PlaceDetailsCard id="ChIJuxwr-xl33IAREkcGhGTb0zI" />
	{/if}

	{#if !notFound}
		<!-- Progress -->
		{#if !finalPlace && nearbyPlaces.length > 0}
			<p class="text-center">
				Round {round} — {currPlace + 1}/{numPlaces}
			</p>
		{/if}

		<!-- Active Place -->
		{#if !finalPlace && nearbyPlaces.length > 0 && currPlace < nearbyPlaces.length}
			<div class="cards">
				<PlaceDetailsCard id={nearbyPlaces[currPlace].id} />
			</div>
		{/if}

		<!-- Action Buttons -->
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

	<!-- Final Winner -->
	{#if finalPlace}
		<div class="mt-10 space-y-4 text-center">
			<h2 class="text-xl font-bold">🎉 Final Choice</h2>
			<PlaceDetailsCard id={finalPlace} />
			<p class="text-gray-500 text-sm">(Winner after {round} rounds)</p>
			<Button onclick={startOver} class="cursor-pointer w-full">
				Start Over
			</Button>
		</div>
	{/if}

	{#if notFound}
		<div class="flex justify-center">
			<Button onclick={startOver} class="cursor-pointer">
				Start Over
			</Button>
		</div>
		<Drawer.Root open>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>😅 No 'maybe' spots left!</Drawer.Title>
					<Drawer.Description>Start Over!</Drawer.Description>
				</Drawer.Header>
				<Drawer.Footer>
					<Button onclick={startOver} class="cursor-pointer">
						Start Over
					</Button>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
	{/if}
</main>
