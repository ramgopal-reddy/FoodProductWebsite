// fetchProducts.js
export async function fetchProductsBySearch(searchTerm = "") {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
    searchTerm
  )}&json=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}
