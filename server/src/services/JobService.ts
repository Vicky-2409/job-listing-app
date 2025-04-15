import { IJobService } from "../interfaces/IJobService";
import { IJobRepository } from "../interfaces/IJobRepository";
import { IJob } from "../models/Job";
import { FilteredJobsResult } from "../types/type";

class JobService implements IJobService {
  private jobRepository: IJobRepository;

  constructor(jobRepository: IJobRepository) {
    this.jobRepository = jobRepository;
  }


  async getFilteredJobs(
    page: number,
    pageSize: number,
    sort: string,
    filters: any
  ): Promise<FilteredJobsResult> {
    return await this.jobRepository.getFilteredJobs(page, pageSize, sort, filters);
  }

  async getJobById(id: string): Promise<IJob | null> {
    return await this.jobRepository.getJobById(id);
  }

  async searchJobsByLocation(location: string): Promise<IJob[]> {
    return await this.jobRepository.searchJobsByLocation(location);
  }
}

export default JobService;