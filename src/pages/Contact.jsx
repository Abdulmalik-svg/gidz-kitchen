import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000); // hide message after 4 seconds
  };

  return (
    <div className="bg-white text-gray-800 px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-orange-600 mb-2">Contact Us</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Got questions? Want to give feedback? Reach out and we'll respond within 24 hours.
        </p>
      </div>

      {/* Grid Layout: Form + Map */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-300"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-300"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-300"
              placeholder="Type your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Send Message
          </button>

          {submitted && (
            <p className="text-green-600 font-medium mt-4">
              ✅ Your message has been sent!
            </p>
          )}
        </motion.form>

        {/* Embedded Map */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-xl border shadow-lg"
        >
          <iframe
            title="NaijaFlex Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9971502523117!2d3.375153974051548!3d6.524379522881691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c4c2ab917f1%3A0x45c54d215c58c05b!2sLagos%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1721052750000!5m2!1sen!2sng"
            width="100%"
            height="100%"
            className="w-full h-[500px]"
            allowFullScreen=""
            loading="lazy"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>

      {/* Contact Info Below */}
      <div className="mt-16 text-center space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-orange-600">Customer Support</h3>
          <p className="text-gray-600">Email: support@naijaflex.com</p>
          <p className="text-gray-600">Phone: +234 812 345 6789</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-orange-600">Business Hours</h3>
          <p className="text-gray-600">Mon – Fri: 9:00am – 6:00pm</p>
          <p className="text-gray-600">Sat: 10:00am – 4:00pm</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-orange-600">Location</h3>
          <p className="text-gray-600">Lagos, Nigeria</p>
        </div>
      </div>
    </div>
  );
}
