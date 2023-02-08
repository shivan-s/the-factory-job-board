<script>
	import '@picocss/pico';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<body>
	<nav>
		<ul />
		<ul>
			<li><strong>The Factory Job Board</strong></li>
		</ul>
		<ul>
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
	<section>
		<main class="container">
			<slot />
		</main>
	</section>
	<footer />
</body>

<style>
	:global(button) {
		width: fit-content;
	}
</style>
