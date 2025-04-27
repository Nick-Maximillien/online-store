"use client";

import { useEffect, useState } from "react";



export default function Chatbot() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000") // Fetch from NestJS
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
       <h1>{message || "Loading.."}</h1>
    </div>
  );
}