import { PrismaClient } from "@prisma/client";

export const readSubmissionsFromDb = async (userId: string) => {
  try {
    const prisma = new PrismaClient();
    const submissions = await prisma.submissions.findMany({
      where: {
        user_id: userId,
      },
    });

    return submissions;
  } catch (err) {
    console.log(err);
    // TODO
  }
};
