import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../api/axios";

function JobDetails() {
    // Decode job name so "CICD%20try" becomes "CICD try"
    const { jobName } = useParams();
    const decodedJobName = decodeURIComponent(jobName);

    const [jobData, setJobData] = useState(null);
    const autoRefresh = useRef(null);

    const getJobDetails = async () => {
        try {
            const res = await api.get(`/jenkins/jobs/${encodeURIComponent(decodedJobName)}`);
            setJobData(res.data);

            const status = res.data?.lastBuild?.result;

            // Stop refresh when build completes
            if (status === "SUCCESS" || status === "FAILURE") {
                clearInterval(autoRefresh.current);
            }

        } catch (err) {
            console.error(err);
            alert("Failed to load job details");
        }
    };

    useEffect(() => {
        getJobDetails();

        autoRefresh.current = setInterval(() => {
            getJobDetails();
        }, 5000);

        return () => clearInterval(autoRefresh.current);
    }, []);

    if (!jobData) return <p>Loading...</p>;

    const lastBuild = jobData.lastBuild;

    return (
        <div style={{ padding: 20 }}>
            <h2 style={{ color: "white" }}>
                Build History for: {decodedJobName}
            </h2>

            {/* Last Build Summary */}
            <div
                style={{
                    padding: "15px",
                    border: "1px solid #ccc",
                    marginBottom: "20px",
                    backgroundColor: "#f9f9f9",
                    color: "black",
                }}
            >
                <h3 style={{ color: "black" }}>Last Build</h3>

                <p>Build Number: {lastBuild?.number}</p>

                <p>
                    Status:
                    <span
                        style={{
                            marginLeft: 10,
                            padding: "5px 10px",
                            borderRadius: "5px",
                            color: "white",
                            backgroundColor:
                                lastBuild?.result === "SUCCESS"
                                    ? "green"
                                    : lastBuild?.result === "FAILURE"
                                    ? "red"
                                    : "orange",
                        }}
                    >
                        {lastBuild?.result || "RUNNING"}
                    </span>
                </p>

                <p>
                    Duration:{" "}
                    {lastBuild?.result === "RUNNING" ? (
                        "Build in progress..."
                    ) : lastBuild?.duration ? (
                        `${(lastBuild.duration / 1000).toFixed(2)} seconds`
                    ) : (
                        "Not available"
                    )}
                </p>
            </div>

            {/* Build Table */}
            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    color: "black",
                    backgroundColor: "white",
                }}
            >
                <thead>
                    <tr>
                        <th>Build Number</th>
                        <th>URL</th>
                    </tr>
                </thead>

                <tbody>
                    {jobData.builds.map((build) => (
                        <tr key={build.number}>
                            <td>{build.number}</td>
                            <td>
                                <a
                                    href={build.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Open Build
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default JobDetails;
