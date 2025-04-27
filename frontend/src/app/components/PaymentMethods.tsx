"use client";
import React from "react";

export default function PaymentMethods({ setPaymentMethod }) {
  return (
    <div className="payment-options">
      <h4>Select Payment Method:</h4>

      <label>
        <input type="radio" name="payment" onChange={() => setPaymentMethod("PayPal")} />
        PayPal
      </label>

      <label>
        <input type="radio" name="payment" onChange={() => setPaymentMethod("Mpesa")} />
        M-Pesa
      </label>

      <label>
        <input type="radio" name="payment" onChange={() => setPaymentMethod("Crypto")} />
        Crypto
      </label>
    </div>
  );
}
