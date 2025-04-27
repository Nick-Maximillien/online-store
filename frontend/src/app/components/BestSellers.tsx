"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../../types";
import { UseFetchProducts } from "@utils/useFetchProducts";

export default function BestSellers() {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    async function getBestSellers() {
      try {
        // Call UseFetchProducts WITHOUT query string directly
        const products = await UseFetchProducts();

        console.log("Fetched Best Sellers:", JSON.stringify(products, null, 2));

        if (!products || !Array.isArray(products)) {
          console.error("Error: API did not return an array", products);
          setBestSellers([]);
          return;
        }

        // Sort products by popularity (assuming you have a "popularity" field)
        const sortedProducts = products
          .filter((p) => p.popularity !== undefined) // Ensure popularity field exists
          .sort((a, b) => b.popularity - a.popularity); // Descending order

        setBestSellers(sortedProducts);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      }
    }
    getBestSellers();
  }, []);

  return (
    <div className="row">
      <h1>Bestsellers</h1>
      {bestSellers.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
