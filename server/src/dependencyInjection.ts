// src/dependencyInjection.ts
import JobController from './controllers/JobController';
import JobService from './services/JobService';
import JobRepository from './repositories/JobRepository';

// Create instances of repositories, services, and controllers
const jobRepository = new JobRepository();
const jobService = new JobService(jobRepository);
const jobController = new JobController(jobService);

// Export the controller to be used in the app
export { jobController };
