import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registration successful");
      navigate("/");
    } catch (err) {
      alert(err.response.data.msg || "Registration failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        /><br/><br/>

        <input 
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        /><br/><br/>

        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        /><br/><br/>

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
}

export default Register;
