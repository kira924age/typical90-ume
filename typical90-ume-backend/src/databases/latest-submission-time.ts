import { PrismaClient } from "@prisma/client";

/**
 * Retrieves submissions for a given user.
 * @param req - The request object.
 * @param req.params.userId - The user ID.
 * @param res - The response object.
 * @returns A promise that resolves to the retrieved submissions.
 */
export const getLatestSubmissionTime = async () => {
  try {
    const prisma = new PrismaClient();
    const submission = await prisma.submissions.findMany({
      orderBy: {
        epoch_second: "desc",
      },
      take: 1,
    });

    const latestSubmissionTime = submission[0].epoch_second ?? 0;
    return latestSubmissionTime;
  } catch (err) {
    console.log(err);
  }

  return undefined;
};
