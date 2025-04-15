import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  job_link: string;
  employment_type: string;
  experience: string;
  description?: string;
  source: string;
  country: string;
  postedDateTime: Date;
  companyImageUrl: string;
  min_exp: number;
  max_exp: number;
  salary?: string;
  seniority_level?: string;
  companytype?: string;
  company_url?: string;
}

const JobSchema: Schema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  job_link: { type: String, required: true },
  employment_type: { type: String, required: true },
  experience: { type: String, required: true },
  description: { type: String },
  source: { type: String, required: true },
  country: { type: String, required: true },
  postedDateTime: { type: Date, required: true, default: Date.now },
  companyImageUrl: { type: String, required: true },
  min_exp: { type: Number, default: 0 },
  max_exp: { type: Number, default: 0 },
  salary: { type: String },
  seniority_level: { type: String },
  companytype: { type: String },
  company_url: { type: String },
});

// Add text index for search functionality
JobSchema.index({ location: "text", title: "text", company: "text" });

export default mongoose.model<IJob>("Job", JobSchema);
