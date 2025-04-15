import { IJob } from "../models/Job";

export interface FilteredJobsResult {
  jobs: IJob[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
