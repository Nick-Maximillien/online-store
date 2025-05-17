'use client';

import { useCart } from '../../context/CartProvider';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import Link from 'next/link';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity ?? 1);
    return sum + price * quantity;
  }, 0);

  const handleCheckout = async () => {
    setLoading(true);
    setErrorMessage('');
    setPaymentStatus('');

    try {
      if (isNaN(total) || total <= 0) {
        throw new Error("Total amount must be a valid positive number.");
      }

      // 1. Create order on Django
      const orderRes = await fetch("http://localhost:8000/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user?.name || "Jane Doe",
          email: user?.email || "janedoe@gmail.com",
          phone: "0711223344",
          address: "Nairobi",
          total,
          items: cart.map((item) => ({
            product_id: item.id,  // assuming this is product FK
            quantity: item.quantity,
            price: item.price
          }))
        }),
      });

      if (!orderRes.ok) {
        const errorData = await orderRes.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      const orderData = await orderRes.json();

      // 2. FAKE payment response instead of calling real API
      // const paymentRes = await fetch("http://localhost:3000/mock-payments/mpesa/initiate/", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     orderId: orderData.id,
      //     provider: "mpesa",
      //     amount: total,
      //   }),
      // });

      // if (!paymentRes.ok) {
      //   const errorData = await paymentRes.json();
      //   throw new Error(errorData.message || "Payment failed");
      // }

      // const { status } = await paymentRes.json();

      // Use fake success status:
      const status = "success";
      setPaymentStatus(status);
      clearCart();

    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <h2>Your cart is empty.</h2>
        <Link href="/products">
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Go to Shop</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Checkout Now</h2>

      {cart.map((item) => (
        <div key={item.id}>
          {item.name} - ${item.price} × {item.quantity}
        </div>
      ))}

      <h3 className="mt-4 text-lg font-bold">Total: ${total.toFixed(2)}</h3>

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {paymentStatus && (
        <p className="mt-4 text-green-700">Payment Status: {paymentStatus}</p>
      )}

      {errorMessage && (
        <p className="mt-4 text-red-600 font-medium">Error: {errorMessage}</p>
      )}
    </div>
  );
};

export default CheckoutPage;
