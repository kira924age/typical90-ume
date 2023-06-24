import { readSubmissionsFromDb } from "../databases/submission";

/**
 * Retrieves submissions for a given user.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of submissions.
 */
export const getSubmissions = (userId: string) => {
  return readSubmissionsFromDb(userId);
};
