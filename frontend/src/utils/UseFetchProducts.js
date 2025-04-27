// utils/UsefetchProducts.ts
export async function UseFetchProducts() {
  try {
    const res = await fetch("http://localhost:8000/products/", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();

    console.log("Fetched products:", data);

    return data.map((product) => ({
      id: product.id,
      name: product.name,
      images: product.images?.map((img) => ({
        image: img.image.startsWith("http")
          ? img.image
          : `http://localhost:8000${img.image}`,
      })) || [],
      description: product.description,
      price: product.price,
      category: product.category,
      featured: product.featured || false,
      recommended: product.recommended || false,
      trending: product.trending || false,
      rating: product.rating,
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
