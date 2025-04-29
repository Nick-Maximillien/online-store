'use server'
import type { Metadata } from "next";
import React from "react";
import "./globals.css"
import Header from "./components/Header";
import Footer from "./components/Footer"
import { CartProvider } from "../context/CartProvider";
import { AuthProvider } from "../context/AuthContext";






export default async function RootLayout(props: {
  children: React.ReactNode
  home: React.ReactNode
}) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/bootstrap/css/bootstrap-grid.min.css" />
      </head>
      <body className="body">
        <div className="container">
          <AuthProvider>
          <CartProvider>
          <Header />
          {props.children}
          <Footer />
          </CartProvider>
          </AuthProvider>       
        </div>
      </body>
    </html>

  )
};
