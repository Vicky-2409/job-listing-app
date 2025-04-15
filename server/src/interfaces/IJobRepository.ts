import { IJob } from "../models/Job";

import { FilteredJobsResult } from "../types/type";

export interface IJobRepository {
  getFilteredJobs(page: number, pageSize: number, sort: string, filters: any): Promise<FilteredJobsResult>;
  getJobById(id: string): Promise<IJob | null>;
  searchJobsByLocation(location: string): Promise<IJob[]>;
}