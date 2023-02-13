<script lang="ts">
	type T = any;
	export let item: T;
	export let rows = 4;
	export let cols = 20;
	export let name: string;
	export let label: string;
	export let required = false;
	export let placeholder = '';
	export let errors: { message: string; path: string[] }[] | null = null;
	$: error = errors?.find((e) => e.path.includes(name));
</script>

<label>
	<strong>{label}</strong>
	<textarea
		{name}
		placeholder={error ? 'Invalid' : placeholder}
		{required}
		value={item && item[name]}
		{rows}
		{cols}
	/>
	{#if error}
		<small>{error.message}</small>
	{/if}
</label>

<style>
	textarea {
		resize: none;
	}
</style>
