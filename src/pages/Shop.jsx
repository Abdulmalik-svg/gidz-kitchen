// src/pages/Shop.jsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

const categories = ["all", "clothes", "shoes", "handbag", "jewellery"];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedCategory(categoryFromURL);
  }, [categoryFromURL]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-white text-gray-800 px-4 sm:px-10 py-16">
      <h1 className="text-4xl font-bold text-orange-500 mb-4 text-center">Shop All Products</h1>
      <p className="text-gray-600 text-center max-w-xl mx-auto mb-8">
        Browse our collection by category — from classy handbags to stylish shoes.
      </p>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSearchParams({ category: cat })}
            className={`capitalize px-5 py-2 rounded-full border transition text-sm font-semibold ${
              selectedCategory === cat
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-orange-50 border border-orange-100 rounded-xl shadow-sm hover:shadow-lg transition-all p-4 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
              <p className="text-orange-500 font-bold mt-1 mb-4">${product.price}</p>

              {/* Action Buttons */}
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success("Added to cart!");
                    
                  }}
                  className="w-1/2 bg-orange-500 text-white text-sm font-semibold py-2 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => navigate("/payment")}
                  className="w-1/2 bg-white border border-orange-500 text-orange-500 text-sm font-semibold py-2 rounded-lg hover:bg-orange-100 hover:shadow-md active:scale-95 transition-all duration-200"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
