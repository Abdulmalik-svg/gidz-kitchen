// src/utils/cart.js

// Get cart from localStorage
export function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  
  // Add item to cart
  export function addToCart(product) {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);
  
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // Remove item by ID
  export function removeFromCart(id) {
    const cart = getCart().filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // Clear all cart items
  export function clearCart() {
    localStorage.removeItem("cart");
  }
  