import React, { useEffect, useState } from "react";
import { fetchProductsBySearch } from "../fetchProducts";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";

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
    <div className="p-6 max-w-7xl bg-[#FAFAFA] mx-auto min-h-screen">
      <PageTitle
        title="Explore Food Products"
        subtitle="Search, filter, and compare food products from OpenFoodFacts"
      />

      {/* Filters */}
      <div className="text-[#333333] flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
        {/* Name Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearchChange}
          className="border border-[#E0E0E0] text-[#333333] bg-white p-3 rounded w-full lg:max-w-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#34A853]"
        />

        {/* Filter Selects */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:w-auto">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border border-[#E0E0E0] bg-white text-[#333333] p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#34A853]"
          >
            <option disabled value="">
              Select Category
            </option>
            <option value="snacks">Snacks</option>
            <option value="beverages">Beverages</option>
            <option value="breakfasts">Breakfasts</option>
            <option value="cereals">Cereals</option>
            <option value="pizzas">Pizzas</option>
            <option value="biscuits-and-cakes">Biscuits & Cakes</option>
            <option value="desserts">Desserts</option>
            <option value="sweets">Sweets</option>
            <option value="juices">Juices</option>
            <option value="soft-drinks">Soft Drinks</option>
            <option value="meats">Meats</option>
            <option value="frozen-foods">Frozen Foods</option>
            <option value="cheeses">Cheeses</option>
            <option value="bread">Bread</option>
            <option value="sauces">Sauces</option>
            <option value="soups">Soups</option>
            <option value="jams">Jams</option>
            <option value="dairies">Dairies</option>
            <option value="plant-based-foods">Plant-based Foods</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="seafood">Seafood</option>
            <option value="baby-foods">Baby Foods</option>
            <option value="energy-bars">Energy Bars</option>
            <option value="ready-meals">Ready Meals</option>
          </select>

          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border border-[#E0E0E0] bg-white text-[#333333] p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#34A853]"
          >
            <option value="product_name">Sort by Name</option>
            <option value="nutrition_grade_fr">Sort by Nutri Grade</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-[#E0E0E0] bg-white text-[#333333] p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#34A853]"
          >
            <option value="asc">A–Z</option>
            <option value="desc">Z–A</option>
          </select>
        </div>

        {/* Barcode Search */}
        <div className="flex w-full sm:w-auto items-center gap-3">
          <input
            type="text"
            placeholder="Enter Barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="border border-[#E0E0E0] p-3 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#34A853]"
          />
          <button
            onClick={() => {
              if (barcode.trim()) navigate(`/product/${barcode.trim()}`);
            }}
            className="bg-[#34A853] hover:bg-[#0B6623] text-white px-4 py-2 rounded transition shadow-md"
          >
            Search
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <Spinner5 />
      ) : sortedProducts.length === 0 ? (
        <p className="text-red-500 text-center mt-12 text-lg">
          No products found.
        </p>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProducts.map((product, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E0E0E0] p-4 rounded-lg shadow hover:shadow-lg transition duration-200"
              >
                <Link to={`/product/${product.code}`}>
                  <img
                    src={
                      product.image_small_url ||
                      "https://via.placeholder.com/100"
                    }
                    alt={product.product_name}
                    className="w-28 h-28 object-contain mx-auto mb-4"
                  />

                  <h2 className="text-lg font-semibold text-[#0B6623] mb-1 text-center">
                    {product.product_name || "Unnamed"}
                  </h2>

                  <p className="text-sm text-gray-600 text-center">
                    <strong>Category:</strong> {category}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Ingredients:</strong>{" "}
                    {product.ingredients_text
                      ? `${product.ingredients_text.slice(0, 50)}...`
                      : "N/A"}
                  </p>

                  <p className="text-sm text-[#34A853] mt-2 text-center">
                    <strong>Nutri Grade:</strong>{" "}
                    {product.nutrition_grade_fr
                      ? product.nutrition_grade_fr.toUpperCase()
                      : "N/A"}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < sortedProducts.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-[#34A853] text-white font-medium rounded hover:bg-[#0B6623] transition shadow-lg"
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
