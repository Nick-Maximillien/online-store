"use client";
import { useState } from "react";

export default function StripePayment({ amount }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const { sessionUrl } = await res.json();
    window.location.href = sessionUrl;
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay with Stripe"}
      </button>
    </div>
  );
}
