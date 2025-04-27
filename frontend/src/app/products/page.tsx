"use server";
import { UseFetchProducts } from "@utils/useFetchProducts";
import ProductCard from "../components/ProductCard";

export default async function products() {
  const products = await UseFetchProducts();

  return (
    <section className="container py-5">
      <h2 className="text-center fw-bold mb-4">Shop</h2>
      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
