"use client";
import { useState } from "react";

export default function CryptoPayment({ amount }) {
  const [wallet, setWallet] = useState("");

  const handlePayment = async () => {
    const res = await fetch("/api/crypto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet, amount }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <input type="text" placeholder="Enter crypto wallet" value={wallet} onChange={(e) => setWallet(e.target.value)} />
      <button onClick={handlePayment}>Pay with Crypto</button>
    </div>
  );
}
