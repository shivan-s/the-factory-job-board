<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let showModal = false;

	type T = $$Generic;
	const dispatch = createEventDispatcher<{ cancel: never; save: T }>();

	const handleCancel = () => {
		showModal = false;
		dispatch('cancel');
	};

	const handleSave = (e: Event & { currentTarget: HTMLFormElement }) => {
		const formData = new FormData(e.currentTarget);
		const data: Record<string, unknown> = {};

		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		dispatch('save', data as T);
		showModal = false;
	};
</script>

<dialog open={showModal}>
	<article>
		<form on:submit|preventDefault={handleSave}>
			<header>
				<button on:click aria-label="cancel" class="close secondary outline" />
				<div class="headings">
					<h3>Create Job</h3>
					<p>Create a new job</p>
				</div>
			</header>
			<label>
				<strong>Title</strong>
				<input type="text" name="title" required />
			</label>
			<label>
				<strong>Description</strong>
				<textarea name="description" rows="4" />
			</label>
			<footer>
				<button class="primary" aria-label="submit">Save</button>
				<button class="secondary outline" aria-label="cancel" on:click|preventDefault={handleCancel}
					>Cancel</button
				>
			</footer>
		</form>
	</article>
</dialog>

<style>
	button {
		width: 100%;
	}
	textarea {
		resize: none;
	}
</style>
