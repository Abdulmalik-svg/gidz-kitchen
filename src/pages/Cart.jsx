import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../utils/cart";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCartItems(getCart());
    toast.success("Item removed from cart");
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen px-4 sm:px-10 py-16 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">
            Your cart is empty.{" "}
            <Link to="/shop" className="text-orange-500 underline">
              Go shopping
            </Link>
            .
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                    <p className="text-sm text-gray-700 mt-1">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm text-red-600 hover:no-underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t pt-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
              <Link to="/payment">
                <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
