"use server";
import { UseFetchProducts } from "@utils/useFetchProducts";
import ProductCard from "../components/ProductCard";

export default async function products() {
  const products = await UseFetchProducts();

  return (
    <section className="container py-5 products">
      <h2 className="text-center fw-bold mb-4">Assorted Products</h2>
      <div className="row assorted">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
