import express from "express";
import { jobController } from "../dependencyInjection.js";  // Importing the controller correctly

const router = express.Router();

// Get all jobs
router.get("/", jobController.getAllJobs.bind(jobController));  // Ensure the context is correct


export default router;
