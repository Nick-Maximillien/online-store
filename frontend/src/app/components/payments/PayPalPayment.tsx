"use client";
import { useEffect } from "react";

export default function PayPalPayment({ amount }) {
  useEffect(() => {
    if (!window.paypal) {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePayment = () => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount.toFixed(2) } }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Payment successful!");
          });
        },
        onError: (err) => {
          console.error("PayPal payment error:", err);
        },
      })
      .render("#paypal-button-container");
  };

  return (
    <div>
      <div id="paypal-button-container"></div>
      <button onClick={handlePayment}>Pay with PayPal</button>
    </div>
  );
}
