import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';

export async function createContext(event: RequestEvent) {
	return {
		// TODO: figure how to add auth.js into this.
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
