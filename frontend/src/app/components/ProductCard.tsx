'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../../context/CartProvider'; // Adjust this import path if needed

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  rating: string;
  images?: { image: string }[];
}

interface ProductCardProps {
  product: Product;
  showQuantityInput?: boolean;
}

const ProductCard = ({ product, showQuantityInput = true }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const qty = parseInt(String(quantity), 10);

    if (isNaN(qty) || qty <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }

    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.images?.[0]?.image || '',
    });
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <Link href={`/products/${product.slug}`} className="text-decoration-none text-dark">
        <div className="position-relative" style={{ width: '100%', height: '250px' }}>
          <Image
            src={product.images?.[0]?.image || '/placeholder.png'}
            alt={product.name}
            width={250}
            height={200}
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">${product.price}</p>
          <p className="card-text">Rating: {product.rating}</p>
        </div>
      </Link>

      {showQuantityInput && (
        <div className="card-footer text-center">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="form-control mb-2"
            placeholder="Quantity"
          />
          <button onClick={handleAddToCart} className="btn btn-primary w-100">
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
