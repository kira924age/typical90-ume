import { readSubmissionsFromDb } from "../databases/submission";

export const getSubmissions = (userId: string) => {
  return readSubmissionsFromDb(userId);
};
