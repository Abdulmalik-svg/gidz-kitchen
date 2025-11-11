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
    }, 4000);
  };

  return (
    <div className="bg-black text-white overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-4 py-20">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-black to-black"></div>
        
        {/* Animated Circles */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Let's <span className="text-orange-500">Connect</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Got questions? Want to place an order? We're here to help. Reach out and we'll respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: "📧",
                title: "Email Us",
                line1: "ibrahimgidado44@gmail.com",
                line2: "We reply within 24hrs"
              },
              {
                icon: "📱",
                title: "Call Us",
                line1: "+2349132719303",
                line2: "Mon-Sat: 9AM - 6PM"
              },
              {
                icon: "📍",
                title: "Visit Us",
                line1: "Tarmac, Malete, Kwara State",
                line2: "Small kitchen, big flavors"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-6 text-center hover:border-orange-500 transition group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.line1}</p>
                <p className="text-gray-400 text-xs mt-1">{item.line2}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM & MAP SECTION */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  Send Us A <span className="text-orange-500">Message</span>
                </h2>
                <p className="text-gray-400 mb-6">Fill out the form below and we'll get back to you soon</p>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-orange-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-orange-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-orange-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition resize-none"
                      placeholder="Tell us what's on your mind..."
                    ></textarea>
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition transform hover:scale-105"
                  >
                    Send Message
                  </button>

                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-center"
                    >
                      <p className="text-green-400 font-medium">
                        ✅ Message sent successfully! We'll be in touch soon.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1"
            >
              <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-2 h-full min-h-[500px]">
                <div className="relative overflow-hidden rounded-xl h-full">
                  <iframe
                    title="NaijaFlex Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9971502523117!2d3.375153974051548!3d6.524379522881691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c4c2ab917f1%3A0x45c54d215c58c05b!2sLagos%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1721052750000!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    className="w-full h-full min-h-[480px] rounded-lg"
                    allowFullScreen=""
                    loading="lazy"
                    style={{ border: 0 }}
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BUSINESS HOURS & INFO */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-orange-950/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              When To <span className="text-orange-500">Reach Us</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-8 text-center"
            >
              <div className="text-4xl mb-4">🕐</div>
              <h3 className="text-xl font-bold mb-4 text-orange-500">Business Hours</h3>
              <div className="space-y-2 text-gray-300">
                <p className="font-medium">Monday - Sunday</p>
                <p className="text-lg">6:00PM - 10:00 PM</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-8 text-center"
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-4 text-orange-500">Quick Response</h3>
              <div className="space-y-3 text-gray-300">
                <p className="text-lg">We reply to messages within</p>
                <p className="text-3xl font-bold text-orange-500">24 Hours</p>
                <p className="text-sm text-gray-400 mt-4">For urgent orders, call us directly during business hours</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Ready to Order?
            </h2>
            <p className="text-orange-100 text-lg mb-8">
              Don't wait! Get your favorite meals delivered fresh from our kitchen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+2348123456789" 
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105"
              >
                Call Now
              </a>
              <a 
                href="#menu" 
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-full text-lg font-semibold transition"
              >
                View Menu
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
