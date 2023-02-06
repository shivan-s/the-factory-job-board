<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';

	import type { PageData } from './$types';

	export let data: PageData;

	let search = '';

	let modal = false;
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

<dialog open={modal}>
	<article>
		<header>
			<a on:click={() => (modal = false)} href="#close" aria-label="Close" class="close" />
			<!-- <button on:click={() => (modal = false)} class="close" /> -->
			<h3>Create Job</h3>
		</header>
		<form>
			<input type="text" />
			<input type="text" />
			<input type="text" />
			<button class="Primary">Save</button>
		</form>
	</article>
</dialog>
