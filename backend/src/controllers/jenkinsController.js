const jenkins = require("../services/jenkinsService");

// Fetch all jobs
exports.getJobs = async (req, res) => {
  try {
    const response = await jenkins.get("/api/json");
    res.json(response.data.jobs);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching Jenkins jobs", error: err.message });
  }
};

// Fetch job builds
exports.getJobBuilds = async (req, res) => {
  try {
    const jobName = decodeURIComponent(req.params.job);

    const response = await jenkins.get(`/job/${jobName}/api/json`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching job builds", error: err.message });
  }
};



// Existing imports above...

// Trigger Jenkins Build
exports.triggerBuild = async (req, res) => {
  try {
    const jobName = decodeURIComponent(req.params.job);

    const response = await jenkins.post(`/job/${jobName}/build`);

    res.json({
      msg: `Build triggered for job: ${jobName}`,
      status: response.status
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Failed to trigger build",
      error: err.message
    });
  }
};

