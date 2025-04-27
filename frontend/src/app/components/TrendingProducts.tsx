
import Link from "next/link";
import Image from "next/image";
import { UseFetchProducts } from "@utils/useFetchProducts";
import ProductCard from "./ProductCard";

export default async function TrendingProducts() {
  const products  = await UseFetchProducts();
  

  return (
    <section className="container">
      <h2 className="text-center fw-bold mb-4">Trending Products</h2>
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
