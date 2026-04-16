// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || location.pathname + location.search === path;

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Menu", path: "/menu" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-black shadow-lg sticky top-0 z-50 border-b border-orange-500/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-90 transition"
        >
          {/* Logo Image */}
          <img
            src="/products/wp_logo.jpg" // ✅ renamed file without spaces
            alt="Sandwich Club & Peppersoup Logo"
            className="w-12 h-12 rounded-full object-cover"
          />

          {/* Logo Text */}
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white tracking-tight">
              GID'S KITHCHEN
            </span>
            <span className="text-sm text-orange-400 font-medium">
            Sandwich Club & Peppersoup <br />
              Join The Club, Taste The Difference
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm font-medium transition ${
                isActive(path)
                  ? "text-orange-500"
                  : "text-white hover:text-orange-500"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-4 py-4 space-y-3 bg-black border-t border-orange-500/20 overflow-hidden"
          >
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`block text-sm font-medium transition py-2 ${
                  isActive(path)
                    ? "text-orange-500"
                    : "text-white hover:text-orange-500"
                }`}
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
