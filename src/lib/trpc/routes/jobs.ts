import prisma from '$lib/prisma';
import { t } from '$lib/trpc/t';
import { logger } from '$lib/trpc/middleware/logger';
import { auth } from '$lib/trpc/middleware/auth';
import { z } from 'zod';

const JobSchema = {
	id: z.string().nullable(),
	organisationId: z.string(),
	title: z.string(),
	description: z.string().optional()
};

export const jobs = t.router({
	getAll: t.procedure.use(logger).query(async () => {
		const jobs = await prisma.job.findMany({
			include: { organisation: true },
			orderBy: { createdAt: 'desc' }
		});
		return jobs;
	}),

	getById: t.procedure
		.use(logger)
		.input(z.string().optional())
		.query(async ({ input }) => {
			const job = await prisma.job.findUniqueOrThrow({
				where: { id: input },
				include: { organisation: true }
			});
			return job;
		}),

	createOrUpdateById: t.procedure
		.use(logger)
		.use(auth)
		.input(z.object(JobSchema))
		.mutation(async ({ input: { id, organisationId, ...rest } }) => {
			const job = prisma.job.upsert({
				where: { id: id },
				create: {
					...rest,
					organisation: { connect: organisationId }
				},
				update: {
					...rest,
					organisation: { connect: organisationId }
				}
			});
			return job;
		}),

	deleteById: t.procedure
		.use(logger)
		.use(auth)
		.input(z.string())
		.mutation(async ({ input: id }) => {
			await prisma.job.delete({ where: id });
		})
});
