import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/Job.js";
import { jobs } from "./jobs.data.js"; // your existing job data

dotenv.config();

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI environment variable is not defined");
  process.exit(1);
}

mongoose.connect(mongoUri);

const seedJobs = async () => {
  try {
    await Job.deleteMany();

    await Job.insertMany(
      jobs.map(({ id, ...rest }) => rest)
    );

    console.log("✅ Jobs seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Job seeding failed", err);
    process.exit(1);
  }
};

seedJobs();
