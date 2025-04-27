"use client";

import Link from "next/link";
import Image from "next/image";

interface Product {
  documentId: string;
  Name?: string;
  Images?: { data?: { attributes?: { url: string } } };
}

export default function ProductList({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return <p className="text-center text-muted">No products available.</p>;
  }

  return (
    <div className="post-list">
      {products.map((product) => {
        if (!product) return null; // Ensure product exists

        const imageUrl = product.Images?.data?.attributes?.url
          ? `http://localhost:1337${product.Images.data.attributes.url}`
          : "/placeholder.jpg";

        return (
          <div key={product.documentId} className="card">
            {product.Images?.data && (
              <Image
                src={imageUrl}
                alt={product.Name || "Untitled Post"}
                width={400}
                height={250}
                className="card-img-top"
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{product.Name || "Untitled Post"}</h5>
              <Link href={`/products/${product.documentId}`} className="btn btn-primary">
                View Product »
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
