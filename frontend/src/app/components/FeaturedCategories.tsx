"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UseFetchCategories } from "@utils/useFetchCategories"; // update path as needed

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await UseFetchCategories();
      setCategories(data);
    }

    fetchCategories();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Shop by Category</h2>

      <div className="row">
        {categories.map((category) => (
          <div key={category.id} className="col-md-4 mb-4">
            <Link href={`/categories/${category.slug}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm">
                  <Image
                    src={category.images[0].image}
                    alt={category.name}
                    width={280}
                    height={250}
                    className="card-img-top"
                  />
                <div className="card-body">
                  <h5 className="card-title">{category.name}</h5>
                  <p className="card-text">{category.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
