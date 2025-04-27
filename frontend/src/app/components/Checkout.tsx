"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartProvider"; // Import cart context
import PaymentMethods from "@/components/PaymentMethods"; // Payment options
import Link from "next/link";

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart(); // Use cart data
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // Process payment logic here (MPesa, PayPal, Crypto, etc.)
    console.log("Processing payment with:", paymentMethod);
    
    // Simulate successful payment
    alert("Payment Successful!");
    clearCart(); //  Empty cart after successful checkout
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center">Checkout</h2>

      {/* Display Cart Items */}
      <div className="cart-summary">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <p><strong>{item.name}</strong> - ${item.price} x {item.quantity}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <h4>Total: ${totalPrice}</h4>

      {/* Payment Options */}
      <PaymentMethods setPaymentMethod={setPaymentMethod} />

      {/* Checkout Button */}
      <button className="btn btn-primary mt-3" onClick={handleCheckout}>
        Pay Now
      </button>

      <p className="mt-3">
        <Link href="/cart">← Back to Cart</Link>
      </p>
    </div>
  );
}
