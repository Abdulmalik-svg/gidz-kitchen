import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 👇 Testimonials Data
const testimonials = [
  {
    name: "Aisha Bello",
    role: "Lagos, Nigeria",
    text: "NaijaFlex helped me find the perfect bag for my sister’s wedding. It arrived fast and looked stunning!",
    image: "/products/aisha bello.jpg",
  },
  {
    name: "Emeka Obi",
    role: "Abuja, Nigeria",
    text: "Their shoes are both stylish and affordable. I’ll definitely be shopping here again!",
    image: "/products/emeka obi.jpg",
  },
  {
    name: "Chiamaka Umeh",
    role: "Enugu, Nigeria",
    text: "Great quality and amazing service. NaijaFlex really understands what Nigerian women want.",
    image: "/products/chiamaka umeh.jpg",
  },
];

// 👇 Testimonial Slider Component
function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-24 max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">What Our Customers Say</h2>

      <div className="relative h-[240px] sm:h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <p className="text-gray-700 text-lg italic mb-4 px-4">{testimonials[index].text}</p>
            <div className="flex justify-center items-center gap-3">
              <img
                src={testimonials[index].image}
                alt={testimonials[index].name}
                className="w-10 h-10 rounded-full object-cover border border-orange-500"
              />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">{testimonials[index].name}</h4>
                <span className="text-xs text-gray-500">{testimonials[index].role}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-orange-500" : "bg-gray-300"
            } transition`}
          />
        ))}
      </div>
    </div>
  );
}

// 👇 Main About Page Component
export default function About() {
  return (
    <div className="bg-white text-gray-800 px-4 sm:px-10 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-orange-500 mb-4">
          About NaijaFlex
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          We bring premium fashion and accessories to your doorstep. From trendy
          handbags to timeless jewellery, our mission is to help you express
          your unique style without breaking the bank.
        </p>
      </div>

      {/* Section: Our Story */}
      <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            NaijaFlex started with a simple idea — to make high-quality fashion
            accessible to everyone in Nigeria and beyond. We hand-pick every
            product, ensuring it reflects both elegance and value.
            <br />
            <br />
            Whether you're shopping for something special or your everyday
            essentials, we’re here to elevate your style.
          </p>
        </div>
        <img
          src="/products/teamwork.jpg"
          alt="Our Team"
          className="rounded-xl w-full object-cover shadow-lg h-[300px] md:h-[400px]"
        />
      </div>

      {/* Section: Highlights */}
      <div className="max-w-4xl mx-auto mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-3xl font-bold text-orange-500">3+</h3>
          <p className="text-gray-600 mt-2">Years in Business</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-orange-500">1,000+</h3>
          <p className="text-gray-600 mt-2">Happy Customers</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-orange-500">100%</h3>
          <p className="text-gray-600 mt-2">Style Guarantee</p>
        </div>
      </div>

      {/* Testimonials Section */}
      <TestimonialSlider />
    </div>
  );
}
