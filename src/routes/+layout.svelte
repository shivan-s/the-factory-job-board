<script lang="ts">
	import '@picocss/pico';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import type { LayoutData } from './$types';
	import Navbar from '../components/Navbar.svelte';

	export let data: LayoutData;
</script>

<QueryClientProvider client={data.queryClient}>
	<body>
		<Navbar />
		<section>
			<main class="container">
				<slot />
			</main>
		</section>
		<footer />
	</body>
</QueryClientProvider>

<style>
	:global(button) {
		width: fit-content;
	}
</style>
