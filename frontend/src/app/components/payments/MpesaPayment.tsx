"use client";
import { useState } from "react";

export default function MpesaPayment({ amount }) {
  const [phone, setPhone] = useState("");

  const handlePayment = async () => {
    const res = await fetch("/api/mpesa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, amount }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <input type="text" placeholder="Enter Mpesa number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={handlePayment}>Pay with Mpesa</button>
    </div>
  );
}
