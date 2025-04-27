'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartProvider';

const CustomerAccount = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    address: '123 Main St, Nairobi, Kenya',
  };
  
  const orders = [
    { id: 1, product: 'Smartphone', price: 299, status: 'Shipped' },
    { id: 2, product: 'Laptop', price: 799, status: 'Delivered' },
  ];

  return (
    <section className='container py-5'>
      <h2 className='fw-bold text-center mb-4'>Customer Account</h2>
      <div className='row'>
        {/* Profile Info */}
        <div className='col-md-4'>
          <div className='card p-3'>
            <h4>Profile</h4>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <button className='btn btn-primary w-100 mt-3'>Edit Profile</button>
          </div>
        </div>
        
        {/* Order History */}
        <div className='col-md-8'>
          <div className='card p-3'>
            <h4>Order History</h4>
            {orders.length > 0 ? (
              <ul className='list-group'>
                {orders.map((order) => (
                  <li key={order.id} className='list-group-item'>
                    <strong>{order.product}</strong> - ${order.price} <span className='text-muted'>({order.status})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders yet.</p>
            )}
            <Link href='/products' className='btn btn-secondary mt-3'>Continue Shopping</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerAccount;
