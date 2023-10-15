const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdById: req.user.userId }).sort(
    "createdAt"
  );
  res
    .status(StatusCodes.OK)
    .json({ success: true, count: jobs.length, data: jobs });
};

const getSingleJob = async (req, res) => {
  const { id } = req.params;
  // const {
  //   user: { userId },         we can do nested destructuring here
  //   params: { id: jobId },  
  // } = req;
  const singleJob = await Job.findOne({ _id: id, createdById: req.user.userId });
  if (!singleJob) {
    throw new NotFoundError(`Job with ID: ${id} not found!`);
  }
  res.status(StatusCodes.OK).json({ success: true, data: singleJob });
};

const createJob = async (req, res) => {
  req.body.createdById = req.user.userId;
  req.body.createdByName = req.user.name;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedJob) {
    throw new NotFoundError(`Job with ID: ${id} not found!`);
  }
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Updated successfully!", data: updatedJob });
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  const deleteJob = await Job.findOneAndDelete({ _id: id });
  if (!deleteJob) {
    throw new NotFoundError(`Job with ID: ${id} not found!`);
  }
  res.status(StatusCodes.OK).json({
    success: true,
    msg: `Job with ID: ${id} was deleted successfully! `,
  });
};

module.exports = { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };
