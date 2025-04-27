import { Suspense } from "react";
import FeaturedCategories from "./FeaturedCategories";
import ProductRecommendations from "./ProductRecommendations"

export default function Home() {
  return (
    <main>
      <Suspense fallback={<p>Loading Recommendations...</p>}>
        <ProductRecommendations />
      </Suspense>

      <Suspense fallback={<p>Loading Categories...</p>}>
        <FeaturedCategories />
      </Suspense>
    </main>
  );
}
