import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner5 from "./Loading";
import "../App.css";
import PageTitle from "./PageTitle";

const ProductDetail = () => {
  const { code } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product))
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) return <Spinner5 />;
  if (!product) return <p className="p-4 text-red-500">Product not found.</p>;

  const nutrients = product.nutriments || {};
  const labels = product.labels_tags || [];

  return (
    <div className="bg-[#FAFAFA] shadow-md rounded-lg p-6 max-w-6xl mx-auto my-8 border border-[#E0E0E0]">
      <PageTitle
        title="Product Details"
        subtitle="Complete information including nutrition facts, ingredients, and labels"
      />

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left: Text Content */}
        <div>
          <h1 className="text-3xl font-bold mb-4 text-[#0B6623]">
            {product.product_name}
          </h1>

          <p className="text-sm text-[#333333] mb-2">
            <strong className="text-[#0B6623]">Generic Name:</strong>{" "}
            {product.generic_name || "N/A"}
          </p>

          <div className="mb-4">
            <strong className="text-[#0B6623]">Ingredients:</strong>
            <ul className="list-disc list-inside ml-4 text-sm text-[#333333] mt-1">
              {product.ingredients_text ? (
                product.ingredients_text.split(",").map((item, idx) => (
                  <li
                    key={idx}
                    dangerouslySetInnerHTML={{
                      __html: item.replace(
                        /_([^_]+)_/g,
                        '<span class="text-[#FFB347] font-semibold">$1</span>'
                      ),
                    }}
                  />
                ))
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          <p className="mb-2 text-sm text-[#333333]">
            <strong className="text-[#0B6623]">Nutri Grade:</strong>{" "}
            {product.nutrition_grade_fr?.toUpperCase() || "N/A"}
          </p>

          <div className="mb-4">
            <strong className="text-[#0B6623]">
              Nutritional Values (per 100g):
            </strong>
            <ul className="list-disc list-inside ml-4 text-sm text-[#333333] mt-1">
              <li>Energy: {nutrients.energy_100g || "N/A"} kJ</li>
              <li>Fat: {nutrients.fat_100g || "N/A"} g</li>
              <li>
                Saturated Fat: {nutrients["saturated-fat_100g"] || "N/A"} g
              </li>
              <li>Carbohydrates: {nutrients.carbohydrates_100g || "N/A"} g</li>
              <li>Sugars: {nutrients.sugars_100g || "N/A"} g</li>
              <li>Proteins: {nutrients.proteins_100g || "N/A"} g</li>
              <li>Salt: {nutrients.salt_100g || "N/A"} g</li>
              <li>Fiber: {nutrients.fiber_100g || "N/A"} g</li>
            </ul>
          </div>

          {labels.length > 0 && (
            <div>
              <strong className="text-[#0B6623]">Labels:</strong>
              <ul className="list-disc list-inside ml-4 text-sm text-[#34A853] mt-1">
                {labels.map((label, idx) => (
                  <li key={idx}>{label.replace(/en:/g, " ")}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Product Image */}
        <div className="flex justify-center">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full max-w-xs h-auto rounded-lg border border-[#E0E0E0] shadow-md hover:scale-105 transition-transform"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
