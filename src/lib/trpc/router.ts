import { t } from '$lib/trpc/t';
import { jobs } from '$lib/trpc/routes/jobs';
import { organisations } from '$lib/trpc/routes/organisations';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const router = t.router({
	jobs: jobs,
	organisations: organisations
});

export type Router = typeof router;

export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
