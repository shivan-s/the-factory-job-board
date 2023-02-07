<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let search = '';
	let modal = false;

	type T = $$Generic;
	const dispatch = createEventDispatcher<{ cancel: never; save: T }>();

	const handleCancel = () => {
		dispatch('cancel');
	};

	const handleSave = (e: { currentTarget: HTMLFormElement }) => {
		const formData = new FormData(e.currentTarget);
		const _data: Record<string, unknown> = {};

		for (let field of formData) {
			const [key, value] = field;
			_data[key] = value;
		}
		dispatch('save', _data as T);
	};
</script>

<h2>Jobs</h2>
<input bind:value={search} type="search" id="search" name="search" placeholder="Search jobs..." />

<a href="#" on:click={() => (modal = true)} role="button">Add Job</a>

{#each data.jobs as job}
	<article>
		<header>
			<div class="headings">
				<h3>{job.title}</h3>
				<p>{formatDistanceToNow(new Date(job.date), { addSuffix: true })}</p>
			</div>
		</header>
		<p>{job.description}</p>
		<footer><a href={`/job/${job.id}`} role="button" class="primary">See more</a></footer>
	</article>
	<section />
{/each}

<form on:submit|preventDefault={handleSave}>
	<dialog open={modal}>
		<article>
			<header>
				<a on:click={() => (modal = false)} href="#close" aria-label="Close" class="close" />
				<!-- <button on:click={() => (modal = false)} class="close" /> -->
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
				<textarea name="description" />
			</label>
			<footer>
				<button class="Secondary" on:click|preventDefault={handleCancel}>Cancel</button>
				<button class="Primary" type="submit">Save</button>
			</footer>
		</article>
	</dialog>
</form>
