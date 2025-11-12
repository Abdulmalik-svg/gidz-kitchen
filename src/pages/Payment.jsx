import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function Payment() {
  const location = useLocation();
  const itemsFromState = location.state?.items || [];
  const totalFromState = location.state?.total || 0;

  const [items, setItems] = useState(itemsFromState);
  const [total, setTotal] = useState(totalFromState);
  const [option, setOption] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const whatsappNumber = "2349132719303";

  // ✅ Detect "Buy Now" from URL query (e.g. ?item=Buffalo%20Chicken&price=3000)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const item = params.get("item");
    const price = params.get("price");

    if (item && price) {
      const singleItem = {
        title: item,
        price: Number(price),
        quantity: 1,
      };
      setItems([singleItem]);
      setTotal(Number(price));
    }
  }, [location.search]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePayment = (e) => {
    e.preventDefault();

    if (!option) return toast.error("Please select Pickup or Delivery");
    if (!form.name || !form.phone) return toast.error("Enter name and phone");
    if (option === "delivery" && !form.address)
      return toast.error("Enter delivery address");

    const messageItems = items
      .map((item) => `${item.quantity} x ${item.title} - ₦${item.price * item.quantity}`)
      .join("\n");

    const message = `
🛍️ *Sandwich & Peppersoup Club Order*

*Name:* ${form.name}
*Phone:* ${form.phone}
${option === "delivery" ? `*Address:* ${form.address}\n` : ""}
*Order Type:* ${option === "pickup" ? "Pickup" : "Delivery"}

*Items:*
${messageItems}

*Total:* ₦${total}

Please confirm my order. Thank you! 🍔🍲
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
    toast.success("Redirecting to WhatsApp...");
  };

  return (
    <div className="bg-black min-h-screen py-16 px-4 sm:px-8 text-white">
      <div className="max-w-4xl mx-auto bg-zinc-900 border border-orange-500/20 rounded-2xl shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-center mb-10">
          <span className="text-orange-500">Checkout</span>
        </h1>

        {/* PICKUP / DELIVERY TOGGLE */}
        <div className="flex justify-center gap-4 mb-10">
          {["pickup", "delivery"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setOption(type)}
              className={`px-6 py-2 rounded-lg border transition ${
                option === type
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "border-gray-600 text-gray-300 hover:border-orange-400"
              }`}
            >
              {type === "pickup" ? "Pickup" : "Delivery"}
            </button>
          ))}
        </div>

        {/* FORM */}
        <form onSubmit={handlePayment} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-300">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {option === "delivery" && (
            <div>
              <label className="block text-sm mb-1 text-gray-300">Delivery Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                rows={3}
              />
            </div>
          )}

          {/* ORDER SUMMARY */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Order Summary</label>
            <textarea
              value={items
                .map((i) => `${i.quantity} x ${i.title} - ₦${i.price * i.quantity}`)
                .join("\n")}
              readOnly
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
              rows={items.length + 1}
            />
          </div>

          {/* TOTAL */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">Total Amount</label>
            <input
              type="text"
              value={`₦${total.toLocaleString()}`}
              readOnly
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition text-lg"
          >
            {option === "pickup" ? "Confirm Pickup" : "Send Delivery Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
