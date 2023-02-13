import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET } from '$env/static/private';
import { sequence } from '@sveltejs/kit/hooks';
import { createTRPCHandle } from 'trpc-sveltekit';
import { router } from '$lib/trpc/router';
import { createContext } from '$lib/trpc/context';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const authorizationHandle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/authenticated')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/auth');
		}
	}
	const result = await resolve(event, { transformPageChunk: ({ html }) => html });
	return result;
};

const authenticationHandle = SvelteKitAuth({
	providers: [
		GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
		Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })
	]
});

const trpcHandle = createTRPCHandle({ router, createContext });

export const handle: Handle = sequence(authenticationHandle, authorizationHandle, trpcHandle);
