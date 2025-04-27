export async function UseFetchCategories() {
  try {
    const res = await fetch("http://localhost:8000/categories/", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = await res.json();
    console.log("Fetched categories:", data);

    return data.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      featured: category.featured || false,
      images: category.image
        ? [{ image: `http://localhost:8000${category.image}` }]
        : [],
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
