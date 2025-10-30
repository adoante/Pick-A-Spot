<script lang="ts">
	interface PlaceDetailsProps {
		id: string;
	}

	let { id }: PlaceDetailsProps = $props();
</script>

<!-- Places UI Kit Web Components -->
<gmp-place-details style="height: 500px; width: 400px">
	<gmp-place-details-place-request place={id}
	></gmp-place-details-place-request>
	<gmp-place-all-content></gmp-place-all-content>
</gmp-place-details>
