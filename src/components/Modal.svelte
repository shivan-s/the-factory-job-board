<script lang="ts">
	export let showModal = false;
</script>

<dialog open={showModal}>
	<article>
		<slot />
	</article>
</dialog>
