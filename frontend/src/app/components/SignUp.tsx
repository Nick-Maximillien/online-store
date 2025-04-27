"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    age: "",
  });

  const [message, setMessage] = useState("");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:1337/api/auth/local/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Signup successful! You can now log in.");
    } else {
      setMessage(data.error.message);
    }
  }

  return (
    <div className="signForm">
    <form onSubmit={handleSubmit} className="p-4 bg-light rounded">
      <h2>Sign Up</h2>

      <input type="text" placeholder="Name" required 
        onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
      
      <input type="email" placeholder="Email" required
        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

      <input type="password" placeholder="Password" required 
        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
       <br />
      <button type="submit">Not a member? Sign up Today</button>
      {message && <p>{message}</p>}
    </form>
    <Link href={"/"}><button>Close</button></Link> 
    </div>
  );
}
