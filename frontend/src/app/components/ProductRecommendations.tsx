"use server"

import Link from "next/link";
import Image from "next/image";
import { UseFetchProducts } from "@utils/useFetchProducts";

export default async function ProductRecommendations() {
  const products = await UseFetchProducts();
  const images = product.image?.data || [];
  const firstImage = images[0]?.url ? `http://localhost:1337${images[0].url}` : "/placeholder.jpg";
  const secondImage = images[1]?.url ? `http://localhost:1337${images[1].url}` : "/placeholder.jpg";

  return (
    <section className="container">
      <h2 className="text-center fw-bold mb-4">AI Recommendations</h2>
      <div className="row productRow">
        {products.map((product) => (
          <div key={product.id} className="col-md-6 col-lg-4 mb-4">
            <Link href={`/product?documentId=${product.documentId}`} className="text-decoration-none">
              <div className="card shadow-sm border-0">
                {product.image && (
                  <div>
                  <Image
                    src={firstImage}
                    alt={product.name}
                    width={200}
                    height={150}
                    className="card-img-top"
                  />
                  <Image
                    src={secondImage}
                    alt={product.name}
                    width={200}
                    height={150}
                    className="card-img-top"
                  />
                  </div>
                )}
                <div className="card-body text-center productDes">
                  <h5 className="fw-bold">{product.name}</h5>
                  <p>$ {product.price}</p>
                  <p className="text-muted">{product.description}</p>
                  <p>{product.rating}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
