<script>
	import '../theme.postcss';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="bg-stone-900">
			<svelte:fragment slot="lead">The Factory Job Board</svelte:fragment>
			<img
				src="http://images.squarespace-cdn.com/content/v1/5f87a041e7f9db54f33aecfd/1602724221600-HP6S9OXEQJN48X0XX3GP/Factory+logo+black.png?format=1500w"
				alt="The Factory logo"
			/>
			(center)
			<svelte:fragment slot="trail">(trail)</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="footer">The Factory Job Board</svelte:fragment>
</AppShell>
