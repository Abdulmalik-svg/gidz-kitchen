import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added this

export default function Home() {
  const navigate = useNavigate(); // ✅ Added this

  const featuredProducts = [
    { title: "Buffalo Chicken Sandwich", price: 3000, image: "/buffalo-01.jpg", tag: "Spicy" },
    { title: "Cat Fish Peppersoup", price: 4000, image: "/products/catfish.jpg", tag: "Bestseller" },
    { title: "Loaded Fries", price: 5000, image: "/products/loaded-fries.jpg", tag: "Popular" }
  ];

  const categories = [
    { name: "Sandwiches", icon: "🥪", link: "#sandwiches" },
    { name: "Peppersoup", icon: "🍲", link: "#peppersoup" },
    { name: "Loaded Fries", icon: "🍟", link: "#loaded-fries" }
  ];

  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true });

  const stats = [
    { label: "Happy Customers", value: "500", suffix: "+" },
    { label: "Delivery Time", value: "30", suffix: "min" },
    { label: "Menu Items", value: "15", suffix: "+" }
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            Where <span className="text-orange-500">Flavor</span> Meets <span className="text-orange-500">Community</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mb-8">
            Authentic peppersoup, gourmet sandwiches, and vibes that feel like home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#menu"
              className="bg-orange-600 hover:bg-orange-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold shadow-md transition-all"
            >
              Browse Menu
            </a>
            <a
              href="/menu"
              className="border-2 border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg font-semibold transition-all"
            >
              Order Now
            </a>
          </div>
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section className="py-12 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-hide py-2">
            {categories.map((cat, index) => (
              <motion.a
                key={index}
                href={cat.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="min-w-[140px] sm:min-w-[160px] flex-shrink-0 bg-neutral-900 border border-orange-600/20 rounded-2xl p-5 sm:p-6 flex flex-col items-center gap-3 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
              >
                <div className="text-4xl sm:text-5xl">{cat.icon}</div>
                <h3 className="font-bold text-white text-lg">{cat.name}</h3>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="menu" className="py-12 sm:py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-orange-500"
          >
            Customer Favorites
          </motion.h2>
          <p className="text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base">
            Our most-ordered dishes everyone is raving about
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-900 border border-orange-600/20 rounded-2xl overflow-hidden hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
              >
                <div className="h-56 sm:h-60 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.tag}
                  </span>
                </div>
                <div className="p-4 sm:p-5 flex flex-col gap-2 sm:gap-3">
                  <h3 className="text-lg sm:text-xl font-semibold">{product.title}</h3>
                  <span className="text-orange-500 font-bold text-lg sm:text-xl">₦{product.price.toLocaleString()}</span>

                  {/* ✅ Updated Buy Now Button */}
                  <button
                    onClick={() =>
                      navigate("/payment", {
                        state: {
                          items: [
                            {
                              title: product.title,
                              price: product.price,
                              quantity: 1,
                            },
                          ],
                          total: product.price,
                        },
                      })
                    }
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-bold transition-all"
                  >
                    Buy Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-12 sm:py-16 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-orange-500">
            Why Join The Club?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: "⚡", title: "Fast Delivery", desc: "Hot meals at your door in 30 minutes or less." },
              { icon: "🔥", title: "Authentic Taste", desc: "Traditional recipes perfected over generations." },
              { icon: "💯", title: "Quality First", desc: "Fresh ingredients, prepared with care daily." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-neutral-900 border border-orange-600/20 rounded-2xl p-6 sm:p-8 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
              >
                <div className="text-4xl sm:text-5xl mb-3">{item.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-12 sm:py-16 bg-orange-600 text-center text-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-4xl sm:text-5xl font-extrabold mb-2">
                {s.value}
                {s.suffix}
              </h3>
              <p className="text-orange-50 font-semibold text-sm sm:text-base">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT / NEWSLETTER */}
      <section id="contact" className="py-12 sm:py-16 bg-black text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-orange-500">
            Join The Club
          </h2>
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
            Get exclusive deals and first access to new menu drops
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 sm:px-5 py-3 sm:py-4 bg-neutral-900 border border-orange-600/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
            />
            <button className="bg-orange-600 hover:bg-orange-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-bold transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
