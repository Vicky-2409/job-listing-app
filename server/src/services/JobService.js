class JobService {
    constructor(jobRepository) {
        this.jobRepository = jobRepository;
    }
    async getFilteredJobs(page, pageSize, sort, filters) {
        return await this.jobRepository.getFilteredJobs(page, pageSize, sort, filters);
    }
    async getJobById(id) {
        return await this.jobRepository.getJobById(id);
    }
    async searchJobsByLocation(location) {
        return await this.jobRepository.searchJobsByLocation(location);
    }
}
export default JobService;
