import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Testimonials Data
const testimonials = [
  {
    name: "Bisi Adedayo",
    role: "Lagos, Nigeria",
    text: "Their peppersoup is the best I've ever had — spicy, rich, and full of flavor. I'm officially addicted!",
  },
  {
    name: "Uche Nwosu",
    role: "Abuja, Nigeria",
    text: "The sandwiches are always fresh and filling. It tastes like something made with real care.",
  },
  {
    name: "Fatima Sule",
    role: "Ilorin, Nigeria",
    text: "Whenever I crave comfort food, Sandwich & Peppersoup Club is my go-to. Their service is top-notch!",
  },
];

// Testimonial Slider Component
function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          What Our <span className="text-orange-500">Community</span> Says
        </h2>
        <p className="text-gray-400">Real reviews from real food lovers</p>
      </motion.div>

      <div className="relative min-h-[220px] sm:min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-orange-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-300 text-lg italic mb-6 leading-relaxed">
                "{testimonials[index].text}"
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <h4 className="text-base font-semibold text-white">
                  {testimonials[index].name}
                </h4>
                <span className="text-sm text-gray-400">{testimonials[index].role}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-orange-500 w-8" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Main About Page Component
export default function About() {
  return (
    <div className="bg-black text-white overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 py-20">
        <div className="relative z-10 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Your <span className="text-orange-500">Favorite Spot</span> on Malete Tarmac
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Sandwich Club & Peppersoup is a cozy roadside spot at Kwara State University. We serve hot, flavorful peppersoup and fresh sandwiches that students, locals, and visitors love. Every bite feels like home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              From a Small Stall to Your Go-To Spot
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              It all started as a small stall on Malete Tarmac, Ilorin. With a love for spicy peppersoup and fresh sandwiches, we quickly became a favorite among students and locals looking for a quick, satisfying meal.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              We may be small, but every meal is prepared with care, flavor, and a dash of love. Our goal is simple: serve tasty, fresh, and affordable meals that bring a smile to your face.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              At Sandwich Club & Peppersoup, you’re not just a customer—you’re part of our Malete Tarmac family. Stop by, grab a bite, and feel the local vibe!
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR PROMISE */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-black to-orange-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Our <span className="text-orange-500">Promise</span> To You
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Every meal is made fresh, hot, and full of flavor — no shortcuts, no compromises. We aim to bring people together over food that warms the heart.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Using fresh ingredients, authentic recipes, and a personal touch, we make sure every bite gives you joy, comfort, and satisfaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl sm:text-4xl font-bold"
          >
            What Makes Us <span className="text-orange-500">Different</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {[
            { icon: "🍲", title: "Authentic Recipes", desc: "Real Nigerian recipes made with care" },
            { icon: "🌿", title: "Fresh Ingredients", desc: "Daily fresh ingredients for every meal" },
            { icon: "❤️", title: "Made With Love", desc: "Prepared with passion and attention" },
            { icon: "⚡", title: "Fast Service", desc: "Quick, friendly service for everyone" },
            { icon: "🧼", title: "Hygienic Standards", desc: "Clean and safe preparation for peace of mind" },
            { icon: "🎯", title: "Customer First", desc: "Your satisfaction is our priority" },
          ].map(({ icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500 transition group"
            >
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-xl font-bold mb-3">{title}</h3>
              <p className="text-gray-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-black to-orange-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Ready To <span className="text-orange-500">Taste the Difference</span>?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Come join our Malete Tarmac family and enjoy authentic, delicious Nigerian flavors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#menu" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105"
              >
                Order Now
              </a>
              <a 
                href="#contact" 
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
