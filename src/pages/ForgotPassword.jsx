import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-8 rounded-xl shadow"
      >
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Reset Your Password
        </h2>

        {submitted ? (
          <div className="text-center space-y-4">
            <p className="text-green-600 font-medium">
              A password reset link has been sent to <strong>{email}</strong>.
            </p>
            <Link to="/login" className="text-orange-600 hover:underline text-sm">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-gray-600 text-sm mb-2 text-center">
              Enter your email address and we’ll send you a reset link.
            </p>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Send Reset Link
            </button>
            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-orange-600 hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
