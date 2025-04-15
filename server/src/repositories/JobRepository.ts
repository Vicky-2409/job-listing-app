import { log } from "console";
import { IJobRepository } from "../interfaces/IJobRepository.js";
import Job, { IJob } from "../models/Job.js";
import { FilteredJobsResult } from "../types/type.js";

class JobRepository implements IJobRepository {
  async getAllJobs(): Promise<IJob[]> {
    return await Job.find().sort({ postedDateTime: -1 });
  }

  async getFilteredJobs(
    page: number,
    pageSize: number,
    sort: string,
    filters: any
  ): Promise<FilteredJobsResult> {
    // Build query based on filters
    const query: any = {};

    // Handle employmentType filter
    if (filters.employmentType) {
      query.employment_type = filters.employmentType.replace("-", " ");
    }

    // Handle experience filter
    if (filters.experience) {
      query.seniority_level = filters.experience.replace("+", " ");
    }

    // Handle location filter with regex for partial match (case-insensitive)
    if (filters.location) {
      const locationRegex = new RegExp(filters.location, "i");
      query.location = { $regex: locationRegex };
    }

    // Handle seniorityLevel filter
    if (filters.seniorityLevel) {
      query.seniorityLevel = filters.seniorityLevel.replace("+", " ");
    }

    // Handle company filter
    if (filters.company) {
      query.company = filters.company.replace("+", " ");
    }

    // Build sort object based on the sorting parameter
    const sortObj: any = {};
    if (sort === "newest") {
      sortObj.postedDateTime = -1; // Descending for newest
    } else if (sort === "oldest") {
      sortObj.postedDateTime = 1; // Ascending for oldest
    } else if (sort === "title-asc") {
      sortObj.title = 1; // Ascending for title
    } else if (sort === "title-desc") {
      sortObj.title = -1; // Descending for title
    } else {
      // Default sorting by newest
      sortObj.postedDateTime = -1;
    }

    // Calculate pagination (skip and limit)
    const skip = (page - 1) * pageSize;

    // Get the total count of jobs matching the query for pagination
    const totalCount = await Job.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    // Execute the query with filters, sorting, and pagination
    const jobs = await Job.find(query).sort(sortObj).skip(skip).limit(pageSize);

    // Return the result with the jobs, total count, total pages, and current page
    return {
      jobs,
      totalCount,
      totalPages,
      currentPage: page,
    };
  }

  async getJobById(id: string): Promise<IJob | null> {
    return await Job.findById(id);
  }

  async searchJobsByLocation(location: string): Promise<IJob[]> {
    const regex = new RegExp(location, "i");
    return await Job.find({ location: { $regex: regex } }).sort({
      postedDateTime: -1,
    });
  }
}

export default JobRepository;
