import type { Router } from '$lib/trpc/router';
import { svelteQueryWrapper } from 'trpc-svelte-query-adapter';
import { useQueryClient, type QueryClient } from '@tanstack/svelte-query';
import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';

let browserClient: ReturnType<typeof svelteQueryWrapper<Router>>;

export function trpc(init?: TRPCClientInit, queryClient?: QueryClient) {
	const client = svelteQueryWrapper<Router>(
		createTRPCClient<Router>({ init }),
		queryClient ? queryClient : useQueryClient()
	);
	if (typeof window === 'undefined') return client;
	if (!browserClient) browserClient = client;
	return browserClient;
}
