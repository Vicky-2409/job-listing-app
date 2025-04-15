// src/interfaces/IJobController.ts
import { Request, Response } from "express";

export interface IJobController {
  getAllJobs(req: Request, res: Response): Promise<void>;
}