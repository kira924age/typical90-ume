// skipcq: JS-C1003
import * as service from "../services/index.service";
import { Request, Response } from "express";

/**
 * Retrieves submissions for a given user.
 * @param req - The request object.
 * @param req.params.userId - The user ID.
 * @param res - The response object.
 * @returns A promise that resolves to the retrieved submissions.
 */
export const getSubmissions = async (req: Request, res: Response) => {
  const submissions = await service.getSubmissions(req.params.userId);
  res.send(submissions);
};
