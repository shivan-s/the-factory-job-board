<script lang="ts">
	type T = any;
	type HTMLInputTypeAttribute = 'text' | 'file' | 'number' | 'password' | 'email';

	export let type: HTMLInputTypeAttribute;
	export let item: T;
	export let name: string;
	export let label: string;
	export let required = false;
	export let placeholder = '';
	export let errors: { message: string; path: string[] }[] | null = null;

	$: error = errors?.find((e) => e.path.includes(name));
</script>

<label>
	<strong>{label}</strong>
	<input
		{name}
		placeholder={error ? 'Invalid' : placeholder}
		{required}
		{type}
		value={item && item[name]}
	/>
	{#if error}
		<small>{error.message}</small>
	{/if}
</label>
