import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import products from "../data/products";
import { toast } from "react-hot-toast";

export default function Menu() {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  // 🧩 Add or update item quantity
  const addItem = (product) => {
    setSelectedItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.title} added to order`);
  };

  // 🧩 Decrease quantity or remove item if quantity = 1
  const decreaseQuantity = (product) => {
    setSelectedItems((prev) =>
      prev
        .map((p) =>
          p.id === product.id
            ? { ...p, quantity: Math.max(p.quantity - 1, 0) }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
    toast.error(`${product.title} quantity decreased`);
  };

  // 🧩 Remove item completely
  const removeItem = (id, title) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
    toast.error(`${title} removed from order`);
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0)
      return toast.error("Select at least one item");
    const total = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    navigate("/payment", { state: { items: selectedItems, total } });
  };

  const getQuantity = (id) =>
    selectedItems.find((item) => item.id === id)?.quantity || 0;

  const totalItems = selectedItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="bg-black text-white min-h-screen pb-28 px-4 sm:px-8 py-12 sm:py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Explore Our <span className="text-orange-500">Delicious Menu</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Choose your favorites and add them to your order
        </p>
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
        {products.map((product, index) => {
          const quantity = getQuantity(product.id);
          const isAdded = quantity > 0;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col bg-zinc-900/40 border border-orange-500/20 rounded-xl overflow-hidden hover:border-orange-500/40 transition-all duration-300"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              <div className="flex flex-col flex-grow p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-semibold mb-1">
                  {product.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-3 line-clamp-2 flex-grow">
                  {product.description}
                </p>
                <p className="text-orange-500 font-bold mb-4 text-lg sm:text-xl">
                  ₦{product.price}
                </p>

                {!isAdded ? (
                  <button
                    onClick={() => addItem(product)}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-md text-sm sm:text-base transition-all"
                  >
                    Add to Order
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between bg-zinc-800 rounded-md px-3 py-2">
                      <button
                        onClick={() => decreaseQuantity(product)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 text-sm"
                      >
                        −
                      </button>
                      <span className="text-lg font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => addItem(product)}
                        className="bg-green-500 hover:bg-green-600 text-white rounded px-2 py-1 text-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(product.id, product.title)}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md text-sm sm:text-base transition-all"
                    >
                      Remove Item
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ✅ Fixed Checkout Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-orange-500/30 px-4 py-4 sm:py-5 flex justify-center shadow-lg">
          <button
            onClick={handleCheckout}
            className="w-full max-w-md bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg text-lg sm:text-xl transition-all"
          >
            Proceed to Checkout ({totalItems} {totalItems === 1 ? "item" : "items"})
          </button>
        </div>
      )}
    </div>
  );
}
