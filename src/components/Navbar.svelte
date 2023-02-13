<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<nav>
	<ul />
	<ul>
		<li><strong><a href="/" class="contrast">The Factory Job Board</a></strong></li>
	</ul>
	<ul>
		<li><a href="/organisations">Organisations</a></li>
		{#if $page.data.session}
			<li>
				<button class="primary" on:click={() => signOut()}>Sign Out</button>
			</li>
			<li>
				{$page.data.session.user?.name}
			</li>
		{:else}
			<li>
				<button class="primary" on:click={() => signIn()}>Sign In</button>
			</li>
		{/if}
	</ul>
</nav>
