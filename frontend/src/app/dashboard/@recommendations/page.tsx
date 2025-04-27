"use server";
import React from "react";
import { UseFetchProducts } from "@utils/useFetchProducts";
import ProductCard from "../../components/ProductCard"; // Import ProductCard

export default async function ProductRecommendations() {
  const products = await UseFetchProducts();

  return (
    <section className="container">
      <h2 className="text-center fw-bold mb-4">AI Recommendations</h2>
      <div className="row productRow">
        {products.map((product) => (
          <div key={product.id} className="col-md-6 col-lg-4 mb-4">
            <ProductCard product={product} /> {/*  Use ProductCard */}
          </div>
        ))}
      </div>
    </section>
  );
}
