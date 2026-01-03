const Job = require('../models/Job');

const getJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

const createJob = async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
};

const updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(job);
};

const deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: 'Job deleted' });
};

module.exports = { getJobs, createJob, updateJob, deleteJob };
