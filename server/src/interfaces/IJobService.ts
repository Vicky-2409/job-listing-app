
import { FilteredJobsResult } from "../types/type";

export interface IJobService {
  getFilteredJobs(page: number, pageSize: number, sort: string, filters: any): Promise<FilteredJobsResult>;
}