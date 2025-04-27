import Link from "next/link";
import Image from "next/image";
import { UseFetchCategories } from "@utils/useFetchCategories";

export default async function CategoriesList() {
  const categories = await UseFetchCategories();

  if (!categories.length) {
    return <p>No categories available.</p>;
  }

  return (
    <section className="container py-5">
      <h2 className="text-center fw-bold mb-4">Shop by Category</h2>
      <div className="row">
        {categories.map((category) => (
          <div key={category.id} className="col-md-4 col-lg-3 mb-4">
            <Link href={`/category/${category.slug}`} className="text-decoration-none">
              <div className="card shadow-sm border-0">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={300}
                    height={200}
                    className="card-img-top"
                  />
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
