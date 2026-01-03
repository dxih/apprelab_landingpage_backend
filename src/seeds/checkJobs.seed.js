import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "../models/Job.js";

dotenv.config();

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI environment variable is not defined");
  process.exit(1);
}

mongoose.connect(mongoUri);

const checkJobs = async () => {
  try {
    const jobs = await Job.find();

    console.log(`🧾 Found ${jobs.length} job(s):\n`);

    jobs.forEach((job, index) => {
      console.log(`🔹 ${index + 1}. ${job.title}`);
      console.log(`   Type: ${job.type}`);
      console.log(`   Location: ${job.location}`);
      console.log(`   ID: ${job._id}\n`);
    });

    process.exit();
  } catch (err) {
    console.error("❌ Failed to fetch jobs", err);
    process.exit(1);
  }
};

checkJobs();
