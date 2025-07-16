import { useCart } from "../context/CartContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Payment() {
  const { cart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    currency: "naira",
  });

  const navigate = useNavigate();
  const usdtAddress = "TXYZ1234567890USDTTRC20";

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      toast.error("Please fill in all fields");
      return;
    }

    // 1. Create a transaction object
    const transaction = {
      id: uuidv4(),
      date: new Date().toISOString(),
      name: form.name,
      email: form.email,
      address: form.address,
      items: cart.map((item) => ({
        title: item.title,
        qty: item.quantity,
        price: item.price,
      })),
      total,
      currency: form.currency === "naira" ? "NGN" : "USD",
      paymentMethod: form.currency === "naira" ? "Bank Transfer" : "Crypto (USDT)",
      status: "Paid",
    };

    // 2. Save it to localStorage
    const existing = JSON.parse(localStorage.getItem("transactions")) || [];
    existing.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(existing));

    // 3. Clear cart and redirect
    localStorage.removeItem("cart");
    toast.success("Payment Successful & Transaction Recorded");
    navigate("/transactions");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("USDT address copied to clipboard!");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-10 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">Secure Checkout</h1>

        {/* Order Summary */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="divide-y border rounded-lg">
            {cart.length === 0 ? (
              <li className="p-4 text-gray-500">Your cart is empty.</li>
            ) : (
              <>
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between p-4">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                    <p className="text-orange-500 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
                <li className="flex justify-between p-4 font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                placeholder="jane@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Shipping Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              rows="3"
              placeholder="123, Lekki Phase 1, Lagos"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Payment Currency</label>
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            >
              <option value="naira">Naira (₦)</option>
              <option value="dollar">Crypto ($)</option>
            </select>
          </div>

          {/* Dynamic Account Details */}
          {form.currency === "naira" ? (
            <div className="bg-gray-100 p-4 rounded-lg border shadow-sm">
              <h3 className="font-bold mb-2 text-gray-800">Pay to this Bank Account:</h3>
              <p className="text-sm">Bank Name: Access Bank</p>
              <p className="text-sm">Account Name: NaijaFlex Ventures</p>
              <p className="text-sm">Account Number: 1234567890</p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl border shadow-md text-center max-w-md mx-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Pay via Bybit USDT (TRC20)</h3>
              <div className="mb-4">
                <img
                  src="/products/usdt_qr_code.png"
                  alt="USDT QR Code"
                  className="w-40 h-40 mx-auto rounded-lg border shadow"
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded border">
                  {usdtAddress}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(usdtAddress)}
                  className="text-xs bg-orange-500 text-white px-3 py-1.5 rounded hover:bg-orange-600 transition"
                >
                  Copy
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Scan or copy address to send USDT</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition text-lg"
          >
            Confirm and Pay
          </button>
        </form>
      </div>
    </div>
  );
}
