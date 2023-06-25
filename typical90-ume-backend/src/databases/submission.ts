import { PrismaClient } from "@prisma/client";

/**
 * Retrieves submissions for a given user.
 * @param req - The request object.
 * @param req.params.userId - The user ID.
 * @param res - The response object.
 * @returns A promise that resolves to the retrieved submissions.
 */
export const readSubmissionsFromDb = async (userId: string) => {
  try {
    const prisma = new PrismaClient();
    const submissions = await prisma.submissions.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        epoch_second: "desc",
      },
    });

    return submissions;
  } catch (err) {
    console.log(err);
    return [];
  }
};
