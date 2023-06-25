import { PrismaClient } from "@prisma/client";
import { getLatestSubmissionTime } from "./latest-submission-time";

// skipcq: JS-0359 Detected the use of require statements except in import statements
const fetch = require("node-fetch");

/**
 * Suspends the execution for a specified number of seconds.
 * @param seconds - The number of seconds to sleep.
 * @returns A promise that resolves after the specified number of seconds.
 */
const sleep = (seconds: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

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

    let lastSubmissionTime = (await getLatestSubmissionTime()) ?? 0;
    for (let i = 0; i < 100; i++) {
      const url = `https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${userId}&from_second=${String(
        lastSubmissionTime + 1
      )}`;
      const res = await fetch(url, {
        headers: { "Accept-Encoding": "gzip" },
      });

      if (res.status === 200) {
        const data = await res.json();
        for (const submission of data) {
          if (submission.contest_id === "typical90") {
            submissions.unshift(submission);
          }
        }
        if (data.length !== 500) {
          break;
        }
        lastSubmissionTime = data[data.length - 1].epoch_second;
      }
      sleep(1);
    }

    return submissions;
  } catch (err) {
    console.log(err);
    return [];
  }
};
