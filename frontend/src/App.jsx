import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import JenkinsDashboard from "./pages/JenkinsDashboard";
import JobDetails from "./pages/JobDetails";


function App() {
  return (
    <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/jenkins" element={<JenkinsDashboard />} />
  <Route path="/jenkins/job/:jobName" element={<JobDetails />} />

</Routes>

  );
}

export default App;
