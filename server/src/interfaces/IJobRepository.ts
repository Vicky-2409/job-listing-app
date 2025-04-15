import { IJob } from "../models/Job.js";

import { FilteredJobsResult } from "../types/type.js";

export interface IJobRepository {
  getFilteredJobs(page: number, pageSize: number, sort: string, filters: any): Promise<FilteredJobsResult>;
  getJobById(id: string): Promise<IJob | null>;
  searchJobsByLocation(location: string): Promise<IJob[]>;
}