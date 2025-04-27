"use client"

import { useCart } from "../../context/CartProvider";
import CartItem from "./CartItem";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function CartPage() {
    const { cart, removeFromCart, clearCart} = useCart();
   // const { user } = useAuth();

   // if (!user) {
   //   return (
   //     <div>
   //      <h2>Access Denied</h2>
    //      <p>You must be logged in to view your cart.</p>
    //      <Link href="/login">
     //       <button className="btn btn-primary">Login</button>
      //    </Link>
    //    </div>
   //   );
   // }

    return (
        <section>
            <h2>Shopping Cart</h2>

            {cart.length === 0 ? (
                <p>Your Cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <CartItem key={item.id} {...item} removeFromCart={removeFromCart} />
                    ))}
                </div>
            )}

            <div>
                {cart.length > 0 && <button onClick={clearCart}>Clear Cart</button>}
                {cart.length > 0 && (
                    <Link href="/checkout">
                    <button className="btn btn-success">Proceed to Checkout</button>
                    </Link>
                 )}
                    <Link href="/products">Continue Shopping</Link>
            </div>
        </section>
    )
}