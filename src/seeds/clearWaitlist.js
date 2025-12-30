// scripts/clearWaitlist.js
require("dotenv").config();
const mongoose = require("mongoose");
const Waitlist = require("../models/Waitlist"); // adjust path if needed

const MONGO_URI = process.env.MONGO_URI;

const clearWaitlist = async () => {
  try {
    await mongoose.connect(MONGO_URI); // no options needed
    console.log("✅ Connected to MongoDB");

    const result = await Waitlist.deleteMany({});
    console.log(`🗑️ Cleared Waitlist: ${result.deletedCount} entries removed`);

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error clearing waitlist:", err);
    process.exit(1);
  }
};

clearWaitlist();
