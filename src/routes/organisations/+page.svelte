<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	let organisations = data.organisations;
	console.log('organisations', organisations);
</script>

<h2>Organisations</h2>
{#each organisations as organisation}
	<article>
		<header>
			<div class="headings">
				<h3>{organisation.name}</h3>
				<p>Created {formatDistanceToNow(new Date(organisation.createdAt), { addSuffix: true })}</p>
			</div>
		</header>
		<p>{organisation.description}</p>
	</article>
	<footer>
		<a href={`/organisations/${organisation.id}`} role="button" class="primary">See more</a>
	</footer>
	<section />
{/each}
