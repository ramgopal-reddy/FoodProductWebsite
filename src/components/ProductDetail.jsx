import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

  if (loading) return <p className="p-4">Loading...</p>;
  if (!product) return <p className="p-4 text-red-500">Product not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{product.product_name}</h1>
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.product_name}
          className="w-48 h-48 object-contain mb-4"
        />
      )}
      <p>
        <strong>Generic Name:</strong> {product.generic_name || "N/A"}
      </p>
      <p>
        <strong>Nutri Grade:</strong>{" "}
        {product.nutrition_grade_fr?.toUpperCase() || "N/A"}
      </p>
      <p>
        <strong>Ingredients:</strong> {product.ingredients_text || "N/A"}
      </p>
    </div>
  );
};

export default ProductDetail;
