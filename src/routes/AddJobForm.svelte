<script lang="ts">
	import type { Job } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';
	import TextInput from '../components/inputs/TextInput.svelte';
	import TextAreaInput from '../components/inputs/TextAreaInput.svelte';
	import Modal from '../components/Modal.svelte';

	export let showModal = false;
	export let job: Job | null = null;
	export let errors: { message: string; path: string[] }[] | null = null;

	type T = $$Generic;
	const dispatch = createEventDispatcher<{ cancel: never; save: T }>();

	const handleCancel = () => {
		showModal = false;
		job = null;
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
	};
</script>

<Modal {showModal}>
	<form on:submit|preventDefault={handleSave}>
		<header>
			<button on:click aria-label="cancel" class="close secondary outline" />
			<div class="headings">
				<h3>Create Job</h3>
				<p>Create a new job</p>
			</div>
		</header>
		<input type="hidden" name="id" value={job?.id} />
		<TextInput label="Title" type="text" name="title" item={job} required {errors} />
		<TextAreaInput label="Description" name="description" item={job} rows={4} {errors} />
		<footer>
			<button class="primary" aria-label="submit">Save</button>
			<button class="secondary outline" aria-label="cancel" on:click|preventDefault={handleCancel}
				>Cancel</button
			>
		</footer>
	</form>
</Modal>

<style>
	button {
		width: 100%;
	}
</style>
