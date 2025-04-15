import { HttpStatusCodes } from "../constants/HttpStatusCodes.js";
import { Messages } from "../constants/Messages.js";
class JobController {
    constructor(jobService) {
        this.jobService = jobService;
    }
    async getAllJobs(req, res) {
        try {
            // Get pagination parameters
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;
            // Get sorting parameter
            const sort = req.query.sort || "newest";
            // Get filter parameters
            const filters = {};
            if (req.query.employmentType) {
                filters.employmentType = req.query.employmentType;
            }
            if (req.query.experience) {
                filters.experience = req.query.experience;
            }
            if (req.query.location) {
                filters.location = req.query.location;
            }
            if (req.query.seniorityLevel) {
                filters.seniorityLevel = req.query.seniorityLevel;
            }
            if (req.query.company) {
                filters.company = req.query.company;
            }
            const result = await this.jobService.getFilteredJobs(page, pageSize, sort, filters);
            res.status(HttpStatusCodes.OK).json(result);
        }
        catch (error) {
            console.log(error);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: Messages.ERROR_FETCHING_JOBS,
                error,
            });
        }
    }
}
export default JobController;
