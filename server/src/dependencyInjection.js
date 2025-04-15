// src/dependencyInjection.ts
import JobController from './controllers/JobController.js';
import JobService from './services/JobService.js';
import JobRepository from './repositories/JobRepository.js';
// Create instances of repositories, services, and controllers
const jobRepository = new JobRepository();
const jobService = new JobService(jobRepository);
const jobController = new JobController(jobService);
// Export the controller to be used in the app
export { jobController };
