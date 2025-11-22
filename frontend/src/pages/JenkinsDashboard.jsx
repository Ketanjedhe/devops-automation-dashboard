import { useEffect, useState } from "react";
import api from "../api/axios";

function JenkinsDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Jenkins jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jenkins/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load Jenkins jobs");
    }
    setLoading(false);
  };

  // Trigger a build
  const triggerBuild = async (jobName) => {
    try {
      await api.post(`/jenkins/build/${jobName}`);
      alert(`Build triggered for: ${jobName}`);
    } catch (err) {
      console.error(err);
      alert("Failed to trigger build");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Jenkins Jobs</h2>
      {loading && <p>Loading...</p>}

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>Job Name</th>
            <th>URL</th>
            <th>Trigger Build</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job.name}>
              <td>
                <a href={`/jenkins/job/${job.name}`}>
                  {job.name}
                </a>
              </td>

              <td><a href={job.url} target="_blank">Open in Jenkins</a></td>
              <td>
                <button onClick={() => triggerBuild(encodeURIComponent(job.name))}>
                  Trigger Build
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default JenkinsDashboard;
