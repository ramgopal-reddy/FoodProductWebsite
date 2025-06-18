import React, { useEffect, useState } from "react";
import { fetchProductsBySearch } from "../fetchProducts";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Spinner5 from "./Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("snacks");
  const [sortBy, setSortBy] = useState("product_name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const term = search.trim() || category;
    setLoading(true);
    fetchProductsBySearch(term)
      .then((res) => {
        setProducts(res);
        setVisibleCount(12); // Reset on new fetch
      })
      .finally(() => setLoading(false));
  }, [search, category]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };
  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleLoadMore = () => setVisibleCount((prev) => prev + 5);

  const sortedProducts = [...products].sort((a, b) => {
    let valA = a[sortBy] || "";
    let valB = b[sortBy] || "";

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  const [barcode, setBarcode] = useState("");
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-7xl bg-black mx-auto">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearchChange}
          className="border border-black-300 bg-black p-2 rounded w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border border-black-300 bg-black p-2 rounded focus:outline-none"
          >
            <option value="snacks">Snacks</option>
            <option value="beverages">Beverages</option>
            <option value="breakfasts">Breakfasts</option>
            <option value="cereals">Cereals</option>
            <option value="pizzas">Pizzas</option>
          </select>

          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border border-black-300 bg-black p-2 rounded focus:outline-none"
          >
            <option value="product_name">Sort by Name</option>
            <option value="nutrition_grade_fr">Sort by Nutri Grade</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-black-300 bg-black p-2 rounded focus:outline-none"
          >
            <option value="asc">A--Z</option>
            <option value="desc">Z--A</option>
          </select>
        </div>

        {/* Barcode Search */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter Barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="border border-black-300 p-2 rounded focus:outline-none w-full sm:max-w-xs"
          />
          <button
            onClick={() => {
              if (barcode.trim()) navigate(`/product/${barcode.trim()}`);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <Spinner5 />
      ) : sortedProducts.length === 0 ? (
        <p className="text-red-500 text-center">No products found.</p>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product, idx) => (
              <div
                key={idx}
                className="border border-black-200 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200"
              >
                <Link to={`/product/${product.code}`}>
                  <h2 className="text-lg font-semibold text-white-800">
                    {product.product_name || "Unnamed"}
                  </h2>

                  <p className="text-sm text-gray-700">
                    <strong>Category:</strong> {category}
                  </p>

                  <p className="text-sm text-gray-700">
                    <strong>Ingredients:</strong>{" "}
                    {product.ingredients_text
                      ? `${product.ingredients_text.slice(0, 50)}...`
                      : "N/A"}
                  </p>

                  <p className="mt-1 text-sm text-blue-600">
                    <strong>Nutri Grade:</strong>{" "}
                    {product.nutrition_grade_fr
                      ? product.nutrition_grade_fr.toUpperCase()
                      : "N/A"}
                  </p>

                  {product.image_small_url && (
                    <img
                      src={product.image_small_url}
                      alt={product.product_name}
                      className="mt-3 w-24 h-24 object-contain mx-auto"
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < sortedProducts.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
