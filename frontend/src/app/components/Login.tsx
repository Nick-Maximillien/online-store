"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: credentials.identifier, // can be username or email
        password: credentials.password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } else {
      setMessage(data.error.message);
    }
  }

  return (
    <div className="loginForm">
    <form onSubmit={handleLogin} className="p-4 bg-light rounded">
      <h2>Login</h2>

      <input type="text" placeholder="Email or Username" required
        onChange={(e) => setCredentials({ ...credentials, identifier: e.target.value })} />

      <input type="password" placeholder="Password" required
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      <br />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
    </div>
  );
}
