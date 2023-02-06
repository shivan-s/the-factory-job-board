import { t } from '$lib/trpc/t';
import { jobs } from '$lib/trpc/routes/jobs';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const router = t.router({
	jobs
});

export type Router = typeof router;

export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
