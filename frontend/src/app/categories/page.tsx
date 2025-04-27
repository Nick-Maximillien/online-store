"use server"
import Link from "next/link";
import Image from "next/image";
import { UseFetchCategories } from "@utils/useFetchCategories";

export default async function FeaturedCategories() {
  const categories = await UseFetchCategories();
  const featuredCategories = categories.filter((category) => category.featured);

  if (!featuredCategories.length) {
    return <p>No featured categories available.</p>;
  }

  return (
    <section className="container py-5 bg-light">
      <h2 className="text-center fw-bold mb-4">View Product Categories</h2>
      <div className="row">
        {featuredCategories.map((category) => (
          <div key={category.id} className="col-md-6 col-lg-4 mb-4">
            <Link href={`/categories/${category.slug}`} className="text-decoration-none">
              <div className="categoryFig shadow-sm border-0">
                {category.image && (
                  <div className="categoryImage">
                  <Image
                    src={`http://localhost:1337${category.image}`}
                    alt={category.name}
                    width={200}
                    height={150}
                    className="categoryImg"
                  />
                  </div>
                )}
                <div className="card-body text-center">
                  <h5 className="fw-bold">{category.name}</h5>
                  <p className="text-muted">{category.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
