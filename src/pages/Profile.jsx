import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, LogOut, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const user = {
    name: "Abdulmalik Badmus",
    email: "abdul@example.com",
    joined: "March 2024",
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-extrabold text-orange-600 text-center mb-6">
          My Profile
        </h2>

        <div className="space-y-6">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-orange-50">
            <User className="w-5 h-5 text-orange-500" />
            <span className="font-medium text-gray-800">{user.name}</span>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-orange-50">
            <Mail className="w-5 h-5 text-orange-500" />
            <span className="font-medium text-gray-800">{user.email}</span>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-orange-50">
            <Lock className="w-5 h-5 text-orange-500" />
            <span className="font-medium text-gray-800">
              Joined: {user.joined}
            </span>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 space-y-3">
          <Link
            to="/edit-profile"
            className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Edit Profile
          </Link>

          <Link
            to="/change-password"
            className="block w-full text-center border border-orange-500 hover:bg-orange-100 text-orange-600 py-3 rounded-lg font-medium transition"
          >
            Change Password
          </Link>

          {/* NEW: Transaction History Link */}
          <Link
            to="/transactions"
            className="block w-full text-center border border-orange-500 hover:bg-orange-100 text-orange-600 py-3 rounded-lg font-medium transition"
          >
            Transaction History
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-sm text-red-500 hover:text-red-600 mt-4"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}
