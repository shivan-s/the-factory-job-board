import prisma from '$lib/prisma';
import { t } from '$lib/trpc/t';
import { logger } from '$lib/trpc/middleware/logger';
import { auth } from '$lib/trpc/middleware/auth';
import { z } from 'zod';

const OrganisationSchema = {
	id: z.string().nullable(),
	authorIds: z.array(z.string()),
	name: z.string(),
	description: z.string().optional()
};

export const organisations = t.router({
	getAll: t.procedure.use(logger).query(async () => {
		const organisations = await prisma.organisation.findMany({
			include: { authors: true, jobs: true },
			orderBy: { name: 'asc' }
		});
		return organisations;
	}),
	getById: t.procedure
		.use(logger)
		.input(z.string().optional())
		.query(async ({ input }) => {
			const organisation = await prisma.organisation.findUniqueOrThrow({
				where: { id: input },
				include: { organisation: true }
			});
			return organisation;
		}),
	createOrUpdateById: t.procedure
		.use(logger)
		.use(auth)
		.input(z.object(OrganisationSchema))
		.mutation(async ({ input: { id, ...rest } }) => {
			const organisation = prisma.organisation.upsert({
				where: { id: id },
				create: {
					...rest
				},
				update: {
					...rest
				}
			});
			return organisation;
		}),
	deleteById: t.procedure
		.use(logger)
		.use(auth)
		.input(z.string())
		.mutation(async ({ input: id }) => {
			await prisma.organisation.delete({ where: id });
		})
});
