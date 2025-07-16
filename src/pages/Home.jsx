import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Home() {
  const featuredProducts = [
    { title: "Jewelleries", price: "79.99", image: "/products/jewel1.jpg" },
    { title: "Luxury Handbag", price: "99.99", image: "/products/bag2.jpg" },
    { title: "Stylish Sneakers", price: "89.99", image: "/products/shoe3.jpg" }
  ];

  const categories = [
    { name: "Jewellery", image: "/products/jewel1.jpg", link: "/shop?category=jewellery" },
    { name: "Handbags", image: "/products/bag2.jpg", link: "/shop?category=handbag" },
    { name: "Shoes", image: "/products/shoe3.jpg", link: "/shop?category=shoes" },
    { name: "Clothes", image: "/products/clothes1.jpg", link: "/shop?category=clothes" }
  ];

  // Animated Stats Logic
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true });
  const controls = useAnimation();

  const stats = [
    { label: "Orders Delivered", value: 2500 },
    { label: "Avg. Delivery Time", value: 48, suffix: "hrs" },
    { label: "Happy Customers", value: 98, suffix: "%" }
  ];

  useEffect(() => {
    if (isInView) {
      stats.forEach(({ value }, i) => {
        controls.start(i => ({
          count: value,
          transition: { duration: 1.5, ease: "easeOut" }
        }));
      });
    }
  }, [isInView, controls]);

  return (
    <div className="bg-white text-gray-800">

      {/* HERO SECTION */}
      <section
        className="min-h-[90vh] flex items-center justify-center text-center px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-xl max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-orange-600 leading-tight">
            Elevate Your Style with Timeless Accessories
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Discover watches, jewellery, handbags and more that define your unique style.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg transition"
          >
            Browse Collection
          </Link>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="py-20 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold text-orange-600 mb-2">Shop by Category</h2>
        <p className="text-gray-500 mb-10">Explore your favorite fashion categories</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={cat.link}
              className="relative group rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white font-semibold text-lg">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-2">Customer Favorites</h2>
        <p className="text-gray-500 mb-10">Bestsellers everyone is talking about</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-orange-50 border border-orange-100 rounded-xl shadow-sm hover:shadow-md transition p-4"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
              <p className="text-orange-600 font-bold mt-2">${product.price}</p>
            </motion.div>
          ))}
        </div>
        <Link
          to="/shop"
          className="mt-10 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg transition"
        >
          Shop All Products
        </Link>
      </section>

      {/* VALUE PROPS */}
      <section className="py-20 px-6 bg-orange-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { icon: "🚚", title: "Fast Shipping", desc: "Nationwide delivery in 2–5 days. Track it all the way." },
            { icon: "💎", title: "Premium Quality", desc: "Crafted with care using high-end materials." },
            { icon: "🛡️", title: "7-Day Returns", desc: "Easy returns. No stress. No hassle." }
          ].map(({ title, icon, desc }) => (
            <div key={title} className="p-6 bg-white rounded-xl border border-orange-100 shadow-sm">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-orange-600 mb-2">{title}</h3>
              <p className="text-gray-700 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-10">What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            { name: "Zainab A.", text: "I’m obsessed with the watch I bought! Fast delivery and premium feel." },
            { name: "Chuka N.", text: "The necklace looks even better in person. Packaging was neat and stylish." }
          ].map(({ name, text }) => (
            <div key={name} className="bg-orange-50 p-6 rounded-xl shadow">
              <p className="text-gray-700 italic mb-2">“{text}”</p>
              <p className="text-orange-600 font-semibold">— {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ANIMATED STATS */}
      <section ref={statsRef} className="py-20 px-6 bg-white text-center">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8">
          {stats.map(({ label, value, suffix = "" }, i) => (
            <motion.div
              key={label}
              className="bg-orange-50 border border-orange-100 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-4xl font-bold text-orange-600 mb-2">
                {value}{suffix}
              </h3>
              <p className="text-gray-600">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 px-6 bg-orange-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Get Exclusive Deals</h2>
        <p className="mb-6 text-orange-100">Join our mailing list and be the first to know about drops and promos.</p>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto px-5 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-orange-100 transition">
            Subscribe
          </button>
        </form>
      </section>

      {/* FINAL CTA */}
      <section className="text-center px-6 py-24 bg-orange-50">
        <h2 className="text-3xl font-bold mb-4 text-orange-600">Ready to Shop?</h2>
        <p className="mb-6 max-w-xl mx-auto text-gray-600">
          Find the piece that speaks your style and order it in minutes.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-600 transition"
        >
          Start Browsing
        </Link>
      </section>
    </div>
  );
}
