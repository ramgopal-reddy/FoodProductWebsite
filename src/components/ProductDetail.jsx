import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import Spinner5 from "./Loading";
import CardExample from "./PlaceHolder";
import "../App.css";

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

  if (loading) return <CardExample />;
  if (!product) return <p className="p-4 text-red-500">Product not found.</p>;

  const nutrients = product.nutriments || {};
  const labels = product.labels_tags || [];

  return (
    <div className="productDetails">
      <h1 className="text-2xl font-bold mb-4">{product.product_name}</h1>

      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.product_name}
          className="w-60 h-60 object-contain mb-6 mx-auto"
          id="product-image"
        />
      )}

      <div className="space-y-2" id="product-info">
        <p>
          <strong>Generic Name:</strong> {product.generic_name || "N/A"}
        </p>

        <strong>Ingredients:</strong>
        <ul className="list-disc list-inside ml-4 mt-1 text-sm text-white-700">
          {product.ingredients_text ? (
            product.ingredients_text.split(",").map((item, idx) => (
              <li
                key={idx}
                dangerouslySetInnerHTML={{
                  __html: item.replace(
                    /_([^_]+)_/g,
                    '<span class="allergen">$1</span>'
                  ),
                }}
              />
            ))
          ) : (
            <li>N/A</li>
          )}
        </ul>

        <p>
          <strong>Nutri Grade:</strong>{" "}
          {product.nutrition_grade_fr?.toUpperCase() || "N/A"}
        </p>

        <div>
          <strong>Nutritional Values (per 100g):</strong>
          <ul
            className="list-disc list-inside ml-4 mt-1 text-sm text-white-700"
            id="product-info"
          >
            <li>Energy: {nutrients.energy_100g || "N/A"} kJ</li>
            <li>Fat: {nutrients.fat_100g || "N/A"} g</li>
            <li>Saturated Fat: {nutrients["saturated-fat_100g"] || "N/A"} g</li>
            <li>Carbohydrates: {nutrients.carbohydrates_100g || "N/A"} g</li>
            <li>Sugars: {nutrients.sugars_100g || "N/A"} g</li>
            <li>Proteins: {nutrients.proteins_100g || "N/A"} g</li>
            <li>Salt: {nutrients.salt_100g || "N/A"} g</li>
            <li>Fiber: {nutrients.fiber_100g || "N/A"} g</li>
          </ul>
        </div>

        {labels.length > 0 && (
          <div>
            <strong>Labels:</strong>
            <ul className="list-disc list-inside ml-4 mt-1 text-sm text-green-700">
              {labels.map((label, idx) => (
                <li key={idx}>{label.replace(/en:/g, " ")}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
