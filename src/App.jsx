import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ForgotPassword from "./pages/ForgotPassword";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Transactions from "./pages/TransactionHistory";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Login from "./pages/LogIn";
import Payment from "./pages/Payment";
import Contact from "./pages/Contact";

// ✅ Protected Route
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signup" />;
}

export default function App() {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Toaster position="top-right" reverseOrder={false} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shop"
              element={
                <ProtectedRoute>
                  <Shop />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
