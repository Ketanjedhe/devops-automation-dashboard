const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const { getJobs, getJobBuilds, triggerBuild } = require("../controllers/jenkinsController");


router.post("/register", register);
router.post("/login", login);


router.get("/jobs", getJobs);
router.get("/jobs/:job", getJobBuilds);

// New build trigger route
router.post("/build/:job", triggerBuild);
module.exports = router;
