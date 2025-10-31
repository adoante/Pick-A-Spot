<script lang="ts">
	import { animate, hover } from "motion";
	import { onMount } from "svelte";

	interface PlaceDetailsProps {
		id: string;
	}

	let { id }: PlaceDetailsProps = $props();
	onMount(() => {
		animate("gmp-place-details", { opacity: [0, 1] }, { duration: 0.8 });
	});
</script>

<!-- Places UI Kit Web Components -->
<gmp-place-details style="height: 60vh; width: auto" class="shadow-lg">
	<gmp-place-details-place-request place={id}
	></gmp-place-details-place-request>
	<gmp-place-all-content></gmp-place-all-content>
</gmp-place-details>
