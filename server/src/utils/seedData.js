import mongoose from "mongoose";
import Job from "../models/Job.js";
import sampleJobsRaw from "../../jobData.json" with { type: "json" };
// This will work if "resolveJsonModule": true in tsconfig.json
import connectDB from "../config/db.js";
async function seedDatabase() {
    try {
        await connectDB();
        console.log("Connected to database");
        // Clear existing data
        const deleteResult = await Job.deleteMany({});
        console.log(`Deleted ${deleteResult.deletedCount} existing jobs`);
        // Parse and extract experience numbers from strings like "0-2 years" or "5-10 years"
        function extractExperienceRange(expString) {
            // Default values
            let min = 0;
            let max = 0;
            if (expString) {
                // Try to extract range like "0-2 years" or "5-10 years"
                const matches = expString.match(/(\d+)-(\d+)/);
                if (matches && matches.length >= 3) {
                    min = parseInt(matches[1], 10);
                    max = parseInt(matches[2], 10);
                }
            }
            return { min, max };
        }
        const transformedJobs = sampleJobsRaw.map((job) => {
            // Extract experience range from the string if not explicitly provided
            let minExp = job.min_exp;
            let maxExp = job.max_exp;
            if ((minExp === undefined || maxExp === undefined) && job.experience) {
                const { min, max } = extractExperienceRange(job.experience);
                minExp = minExp !== undefined ? minExp : min;
                maxExp = maxExp !== undefined ? maxExp : max;
            }
            return {
                title: job.title,
                company: job.company,
                location: job.location,
                job_link: job.job_link,
                employment_type: job.employment_type,
                experience: job.experience,
                source: job.source,
                country: job.country || "Not Specified",
                postedDateTime: new Date(job.postedDateTime.$date),
                seniority_level: job.seniority_level || undefined,
                companytype: job.companytype || undefined,
                company_url: job.company_url || undefined,
                min_exp: minExp || 0,
                max_exp: maxExp || 0,
                companyImageUrl: job.companyImageUrl ||
                    "https://media.licdn.com/dms/image/v2/D4D0BAQEB-fCuD2dlHw/company-logo_200_200/company-logo_200_200/0/1698331980893/mployee_me_logo?e=2147483647&v=beta&t=gRn6lffC8J9j53Ih8XtP-KuM0PZe5uGxmibF7hHyGHs",
            };
        });
        // Validate data before insertion
        const validJobs = transformedJobs.filter((job) => {
            const isValid = job.title && job.company && job.location && job.job_link;
            if (!isValid) {
                console.warn(`Skipping invalid job entry: ${job.title || "Unknown title"} at ${job.company || "Unknown company"}`);
            }
            return isValid;
        });
        // Insert data in batches to handle large datasets more efficiently
        const batchSize = 100;
        for (let i = 0; i < validJobs.length; i += batchSize) {
            const batch = validJobs.slice(i, i + batchSize);
            await Job.insertMany(batch, { ordered: false });
            console.log(`Inserted batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(validJobs.length / batchSize)}`);
        }
        console.log(`✅ ${validJobs.length} jobs inserted successfully!`);
    }
    catch (error) {
        console.error("❌ Error seeding database:", error);
    }
    finally {
        // Properly close the connection when done
        await mongoose.connection.close();
        console.log("Database connection closed");
        process.exit(0);
    }
}
// Execute the seeding function
seedDatabase().catch((err) => {
    console.error("Failed to seed database:", err);
    mongoose.connection.close();
    process.exit(1);
});
