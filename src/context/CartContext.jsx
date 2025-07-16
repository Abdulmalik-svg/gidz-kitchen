// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../utils/cart";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = () => {
    const currentCart = getCart();
    setCart(currentCart);
    const count = currentCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  // ✅ Define addToCart inside context
  const addToCart = (product) => {
    const currentCart = getCart();
    const existing = currentCart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    setCart(currentCart);
    setCartCount(currentCart.reduce((sum, item) => sum + item.quantity, 0));
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    refreshCart();
    window.addEventListener("storage", refreshCart);
    return () => window.removeEventListener("storage", refreshCart);
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, cartCount, refreshCart, addToCart }} // ✅ include it here
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
