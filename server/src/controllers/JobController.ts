import { Request, Response } from "express";
import { IJobController } from "../interfaces/IJobController";
import { IJobService } from "../interfaces/IJobService";
import { HttpStatusCodes } from "../constants/HttpStatusCodes";
import { Messages } from "../constants/Messages";

class JobController implements IJobController {
  private jobService: IJobService;

  constructor(jobService: IJobService) {
    this.jobService = jobService;
  }

  async getAllJobs(req: Request, res: Response): Promise<void> {
    try {
      // Get pagination parameters
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;

      // Get sorting parameter
      const sort = (req.query.sort as string) || "newest";

      // Get filter parameters
      const filters: any = {};

      if (req.query.employmentType) {
        filters.employmentType = req.query.employmentType as string;
      }

      if (req.query.experience) {
        filters.experience = req.query.experience as string;
      }

      if (req.query.location) {
        filters.location = req.query.location as string;
      }

      if (req.query.seniorityLevel) {
        filters.seniorityLevel = req.query.seniorityLevel as string;
      }

      if (req.query.company) {
        filters.company = req.query.company as string;
      }

      const result = await this.jobService.getFilteredJobs(
        page,
        pageSize,
        sort,
        filters
      );

      res.status(HttpStatusCodes.OK).json(result);
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: Messages.ERROR_FETCHING_JOBS,
        error,
      });
    }
  }

}

export default JobController;
