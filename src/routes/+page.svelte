<script lang="ts">
	import PlaceDetailsCard from "$lib/components/PlaceDetailsCard.svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
</script>

<main class="md:space-y-15 space-y-10 flex flex-col">
	<!-- Hero Section -->
	<div
		class="md:space-y-20 space-y-8 md:py-50 md:px-10 py-10 px-5 border hover:shadow-md transition-shadow shadow-zinc-800 shadow-sm rounded-xl bg-background/20 backdrop-blur-sm"
	>
		<h1 class="text-5xl font-bold text-center">
			"I’m fine with anything."
		</h1>

		<p class="md:text-xl text-lg text-center">
			For every friend group that can’t decide where or when to go out.
			<strong>Pick-a-Spot</strong> makes the choice for you. Stop saying “whatever
			you guys want” and start planning in seconds.
		</p>

		<div class="flex flex-col sm:flex-row justify-center gap-5">
			<Button>
				<a href="/search" class="font-semibold">Try It Now</a>
			</Button>
			<Button variant="outline">
				<a href="/search" class="font-semibold">See How It Works</a>
			</Button>
		</div>
	</div>

	<!-- Features Section -->
	<div class="grid grid-cols-1 md:grid-cols-3 w-full gap-5">
		<Card.Root
			class="shadow-sm hover:shadow-md transition-shadow rounded-none shadow-zinc-800"
		>
			<Card.Header>
				<Card.Title>Find spots fast</Card.Title>
				<Card.Description>like 20 of them.</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>
					Search nearby spots using your current location or any place
					you choose. Cafes, restaurants, parks — whatever you name
					it.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root
			class="shadow-sm hover:shadow-md transition-shadow rounded-none shadow-zinc-800"
		>
			<Card.Header>
				<Card.Title>Invite your group</Card.Title>
				<Card.Description>However big!</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>
					Share a link so friends can join and <strong
						>vote by elimination</strong
					> on which spot to go. No endless chats. No “idk” messages.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root
			class="shadow-sm hover:shadow-md transition-shadow rounded-none shadow-zinc-800"
		>
			<Card.Header>
				<Card.Title>Pick a date & time</Card.Title>
				<Card.Description>Any date or time.</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>
					Once you’ve chosen the place, use the same elimination-style
					picker to agree on when to meet — it’s quick, fair, and
					frustration-free.
				</p>
			</Card.Content>
		</Card.Root>

		<Card.Root
			class="shadow-sm hover:shadow-md transition-shadow rounded-none shadow-zinc-800 md:col-span-3"
		>
			<Card.Header>
				<Card.Title>Powered by Google</Card.Title>
				<Card.Description>APIs on APIs.</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-3">
				<p>
					Leverages the <strong>Google Places API</strong> to give you
					accurate, real-time data for thousands of restaurants, cafes,
					bars, and parks around the world.
				</p>
				<p>
					Plus, with the <strong>Google Places UI Kit</strong>, you
					get a polished, interactive experience for browsing
					locations, previewing maps, and voting on where your group
					wants to go — all seamlessly integrated.
				</p>
			</Card.Content>
		</Card.Root>
	</div>

	<PlaceDetailsCard id="ChIJuxwr-xl33IAREkcGhGTb0zI" />

	<!-- Final Call to Action -->
	<Card.Root
		class="shadow-sm hover:shadow-md transition-shadow rounded-none shadow-zinc-800"
	>
		<Card.Header class="space-y-5">
			<Card.Title class="text-3xl">Ready to Get Started?</Card.Title>
			<Card.Description class="text-lg">
				Take the next step toward your perfect meetup.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="text-xl">
				Don’t wait! Explore places, set up your schedule, and make plans
				happen with ease. Your ideal meetup is just a few clicks away.
			</p>
		</Card.Content>
		<Card.Footer>
			<Button size="lg">
				<a href="/search" class="font-semibold"> Start Planning </a>
			</Button>
		</Card.Footer>
	</Card.Root>
</main>
