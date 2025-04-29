"use client";
import Link from "next/link";
import HeroSection from "./HeroSection"
import { useCart } from "../../context/CartProvider";

export default function Header() {
  const { cart } = useCart();

  return (
    <header className="header col-12">
      <div className="row align-items-center cartContainer">
        <div className="col-2 logo">
          <img className="logoImg" src="/images/logo.png" alt="logo" />
        </div>
        <nav className="col-8 d-flex justify-content-center nav">
          <ul className="nav col-8">
            <li className="nav-item"><Link className="nav-link" href="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/categories">Categories</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="col-2 cart">
          <Link href="/cart" className="btn btn-outline-primary">
          <p className="basket">🛒 Cart </p>
           {cart.length > 0 && (
            <span className="cartLength">  ( {cart.length} )</span>
           )}
          </Link>
        </div>
        <HeroSection />
      </div>
    </header>
  );
}
