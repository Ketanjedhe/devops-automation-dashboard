function Dashboard() {
  return (
    <div style={{ padding: 40 }}>
      <h1>DevOps Automation Dashboard</h1>
      <p>Welcome! You are logged in.</p>

      <div style={{ marginTop: 20 }}>
        <a
          href="/jenkins"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          Go to Jenkins Dashboard
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
