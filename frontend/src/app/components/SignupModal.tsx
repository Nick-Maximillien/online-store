"use client";
import { useState } from "react";


export default function SignupModal({ isOpen, onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (data.jwt) {
        localStorage.setItem("token", data.jwt);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Signup successful!");
        onClose(); // Close modal after signup
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
