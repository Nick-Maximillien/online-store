

// CustomerProfile.tsx
"use client";

import { useState, useEffect } from "react";
import { getOrders } from "@utils/orderService";

const CustomerProfile = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const userOrders = await getOrders();
      setOrders(userOrders);
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>Order #{order.id} - ${order.total}</div>
      ))}
    </div>
  );
};

export default CustomerProfile;