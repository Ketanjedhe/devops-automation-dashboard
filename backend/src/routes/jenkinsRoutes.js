const router = require("express").Router();
const { getJobs, getJobBuilds, triggerBuild } = require("../controllers/jenkinsController");

router.get("/jobs", getJobs);
router.get("/jobs/:job", getJobBuilds);
router.post("/build/:job", triggerBuild);

module.exports = router;
