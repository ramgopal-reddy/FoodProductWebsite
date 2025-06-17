// Products.jsx
import React, { useEffect, useState } from "react";
import { fetchProductsBySearch } from "../fetchProducts";
import { Link } from "react-router-dom";

import Spinner5 from "./Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("snacks");
  const [sortBy, setSortBy] = useState("product_name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const term = search.trim() || category;
    setLoading(true);
    fetchProductsBySearch(term)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [search, category]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };
  const handleSortChange = (e) => setSortBy(e.target.value);

  const sortedProducts = [...products].sort((a, b) => {
    let valA = a[sortBy] || "";
    let valB = b[sortBy] || "";

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-black-800 mb-6 text-center">
        Food Products
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearchChange}
          className="border border-black-300 p-2 rounded w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border border-black-300 p-2 rounded focus:outline-none"
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
            className="border border-black-300 p-2 rounded focus:outline-none"
          >
            <option value="product_name">Sort by Name</option>
            <option value="nutrition_grade_fr">Sort by Nutri Grade</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-black-300 p-2 rounded focus:outline-none"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <Spinner5 />
      ) : sortedProducts.length === 0 ? (
        <p className="text-red-500 text-center">No products found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product, idx) => (
            <div
              key={idx}
              className="border border-black-200 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200"
            >
              <h2 className="text-lg font-semibold text-black-800">
                {product.product_name || "Unnamed"}
              </h2>
              <p className="text-sm text-black-500">
                {product.generic_name || "No description"}
              </p>
              <p className="mt-2 text-sm text-blue-600">
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
              {/* // Inside product card, add this: */}
              <Link to={`/product/${product.code}`}>
                <button className="mt-4 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition ">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
