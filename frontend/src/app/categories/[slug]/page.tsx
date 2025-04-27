"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function CategoryPage() {
  const { slug } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`http://localhost:8000/categories/${slug}/products/`);
        const data = await res.json();

        if (!data || data.length === 0) {
          notFound();
          return;
        }

        setProducts(data);
        setCategoryName(data[0]?.category?.name || slug);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [slug]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container py-5">
      <h1 className="text-center">{categoryName}</h1>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              {product.images?.[0] && (
                <Image
                  src={`http://localhost:8000${product.images[0].image}`}
                  alt={product.name}
                  width={400}
                  height={250}
                  className="card-img-top"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
                <Link href={`/products/${product.slug}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
