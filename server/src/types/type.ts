import { IJob } from "../models/Job.js";

export interface FilteredJobsResult {
  jobs: IJob[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
