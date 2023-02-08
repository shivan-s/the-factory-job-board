<script lang="ts">
	import { trpc } from '$lib/trpc/client';
	import type { Job } from '@prisma/client';
	import { formatDistanceToNow } from 'date-fns';
	import type { PageData } from './$types';
	import AddJobForm from './AddJobForm.svelte';

	let search = '';
	let loading = false;

	export let data: PageData;
	/* let jobs = data.jobs */
	let jobs: Job[] = [];

	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};

	const handleSave = async (e: CustomEvent) => {
		loading = true;
		const newJob = e.detail;
		await trpc().jobs.createOrUpdateById.mutate(newJob);
		loading = false;
	};
</script>

<h2>Jobs</h2>
<input bind:value={search} type="search" id="search" name="search" placeholder="Search jobs..." />

<button on:click={toggleModal}>Add Job</button>

{#if loading}
	<article aria-busy={loading} />
{/if}
{#each jobs as job}
	<article>
		<header>
			<div class="headings">
				<h3>{job.title}</h3>
				<p>
					Created {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
					{#if job.createdAt !== job.updatedAt}{formatDistanceToNow(new Date(job.updatedAt))}{/if}
				</p>
			</div>
		</header>
		<p>{job.description}</p>
		<footer><a href={`/job/${job.id}`} role="button" class="primary">See more</a></footer>
	</article>
	<section />
{/each}

<AddJobForm {showModal} on:click={toggleModal} on:save={handleSave} />
