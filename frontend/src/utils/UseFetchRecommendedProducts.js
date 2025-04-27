export async function UseFetchRecommendedProducts() {
  try {
    const res = await fetch("http://localhost:1337/api/products?filters[recommended][$eq]=true&populate=*");
    if (!res.ok) throw new Error("Failed to fetch products");

    const { data } = await res.json();
    console.log("fetched data:", JSON.stringify(data, null, 2))
    return data.map((product) => ({
      id: product.id,
      name: product.name,
      images: product.image?.data?.map((img) => `http://localhost:1337${img.url}`) || [],
      description: product.description,
      price: product.price,
      stock: product.stock,
      featured: product.Featured,
      bestseller: product.bestseller,
      Rating: product.rating,
      recommended: product.recommended,
      trending: product.trending,
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
