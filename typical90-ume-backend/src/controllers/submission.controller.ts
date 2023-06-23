import * as service from "../services/index.service";
import { Request, Response } from "express";

export const getSubmissions = async (req: Request, res: Response) => {
  const submissions = await service.getSubmissions(req.params.userId);
  res.send(submissions);
};
