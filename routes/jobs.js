const express = require("express");
const {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  getSingleJob,
} = require("../controllers/jobs");
const router = express.Router();

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").patch(updateJob).delete(deleteJob).get(getSingleJob);

module.exports = router;
