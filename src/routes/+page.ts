import { trpc } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { queryClient } = await event.parent();
	const client = trpc(event, queryClient);

	const utils = client.useContext();

	await utils.jobs.getAll.prefetch();
}) satisfies PageLoad;
