"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Product {
  id: number;
  attributes: {
    Name: string;
    Price: number;
    Description: string;
    Image?: { data?: { attributes?: { url: string } } };
  };
}

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const documentId = searchParams.get("documentId"); // ✅ Get documentId from URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!documentId) {
      setError("Product not found.");
      setLoading(false);
      return;
    }

    console.log("Captured documentId:", documentId);

    fetch(`http://localhost:1337/api/products?filters[documentId][$eq]=${documentId}&populate=*`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length > 0) {
          console.log("Fetched Product Data:", data.data[0]);
          setProduct(data.data[0]); // ✅ Get first matching product
        } else {
          setError("Product not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Failed to load product.");
        setLoading(false);
      });
  }, [documentId]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!product) return <p>Product not found.</p>;

  const { attributes } = product;
  const imageUrl = attributes.Image?.data?.attributes?.url
    ? `http://localhost:1337${attributes.Image.data.attributes.url}`
    : "/placeholder.jpg";

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${attributes.Name} to cart.`);
    // Add to cart logic here
  };

  return (
    <div className="row">
      {/* Product Image */}
      <div className="col-md-6">
        <img
          src={imageUrl}
          alt={attributes.Name}
          className="img-fluid rounded shadow-sm"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
      </div>

      {/* Product Info */}
      <div className="col-md-6">
        <h2 className="fw-bold">{attributes.Name}</h2>
        <p className="text-muted">${attributes.Price?.toFixed(2) || "N/A"}</p>
        <p>{attributes.Description || "No description available."}</p>

        {/* Quantity & Add to Cart */}
        <div className="d-flex align-items-center mb-3">
          <input
            type="number"
            value={quantity}
            min="1"
            className="form-control me-2"
            style={{ width: "80px" }}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          />
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        <Link href="/articles">
          <button className="btn btn-secondary">Back</button>
        </Link>
      </div>
    </div>
  );
}
