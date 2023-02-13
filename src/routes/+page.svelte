<script lang="ts">
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';
	import type { RouterInputs } from '$lib/trpc/router';
	import { TRPCClientError } from '@trpc/client';
	import { formatDistanceToNow } from 'date-fns';
	import type { PageData } from './$types';
	import AddJobForm from './AddJobForm.svelte';

	let search = '';
	let loading = false;
	let errors: { message: string; path: string[] }[] | null = null;
	let job: RouterInputs['jobs']['createOrUpdateById'] | null = null;
	const { mutate: createJob } = trpc($page).jobs.createOrUpdateById.useMutation({
		onSuccess: () => {
			job = null;
			showModal = false;
		}
	});

	export let data: PageData;
	const jobs = data.jobs;

	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};

	const handleSave = async (e: CustomEvent) => {
		loading = true;
		try {
			await createJob(e.detail);
		} catch (err) {
			if (err instanceof TRPCClientError) {
				errors = JSON.parse(err.message);
			} else {
				throw err;
			}
		} finally {
			loading = false;
		}
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

<AddJobForm {job} {errors} {showModal} on:click={toggleModal} on:save={handleSave} />
