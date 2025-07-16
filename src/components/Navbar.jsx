// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Menu, X, User } from "lucide-react"; // added User
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  const isActive = (path) =>
    location.pathname === path || location.pathname + location.search === path;

  const navLinks = [
    { label: "Home", path: "/" },
    {
      label: "Shop",
      path: "/shop",
      dropdown: [
        { label: "Clothes", path: "/shop?category=clothes" },
        { label: "Shoes", path: "/shop?category=shoes" },
        { label: "Handbags", path: "/shop?category=handbag" },
        { label: "Jewellery", path: "/shop?category=jewellery" },
      ],
    },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-orange-500 tracking-tight hover:opacity-90 transition"
        >
          NaijaFlex
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, path, dropdown }) => (
            <div key={path} className="relative group">
              <Link
                to={path}
                className={`text-sm font-medium transition ${
                  location.pathname.startsWith("/shop") && label === "Shop"
                    ? "text-orange-500"
                    : isActive(path)
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {label}
              </Link>

              {dropdown && (
                <div className="absolute left-0 top-full mt-2 min-w-[160px] bg-white rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
                  {dropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-4 py-2 text-sm ${
                        location.search === item.path.split("?")[1]
                          ? "bg-orange-50 text-orange-500"
                          : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Icons: Profile + Cart */}
          <div className="flex items-center gap-4">
            {/* Profile Icon */}
            <Link
              to="/profile"
              className="text-gray-700 hover:text-orange-500 transition"
              title="Login"
            >
              <User className="w-6 h-6" />
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-800 hover:text-orange-500 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden px-4 pt-2 pb-4 space-y-3 bg-white border-t"
          >
            {navLinks.map(({ label, path, dropdown }) => (
              <div key={path}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-sm font-medium transition ${
                    location.pathname.startsWith("/shop") && label === "Shop"
                      ? "text-orange-500"
                      : isActive(path)
                      ? "text-orange-500"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  {label}
                </Link>

                {dropdown && (
                  <div className="pl-4 mt-1 space-y-1">
                    {dropdown.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={`block text-sm ${
                          location.search === item.path.split("?")[1]
                            ? "text-orange-500"
                            : "text-gray-600 hover:text-orange-500"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Login */}
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-gray-800 hover:text-orange-500 text-sm font-medium"
            >
              <User className="w-5 h-5" />
              <span>Login</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-gray-800 hover:text-orange-500 text-sm font-medium"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart ({cartCount})</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
