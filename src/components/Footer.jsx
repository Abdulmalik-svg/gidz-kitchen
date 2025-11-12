import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-orange-500/20 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo + Motto */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/products/wp_logo.jpg"
                alt="S&P Logo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <h2 className="text-xl font-bold">Sandwich Club & Peppersoup</h2>
            </div>
            <p className="text-orange-500 text-sm font-semibold mb-2">
              Join The Club TasteThe Difference
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Where flavor meets community. Authentic peppersoup, gourmet sandwiches, and good vibes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-500">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", to: "/" },
                { name: "Menu", to: "/menu" },
                { name: "About Us", to: "/about" },
                { name: "Contact", to: "/contact" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-orange-500 transition flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-500">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>
                  Malete Tarmac,<br />
                  Kwara State University,<br />
                  Ilorin, Kwara State
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a
                  href="tel:+2347046057875,+2349132719303"
                  className="hover:text-orange-500 transition"
                >
                  +2347046057875 +2349132719303
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <a
                  href="mailto:ibrahimgidado@gmail.com"
                  className="hover:text-orange-500 transition"
                >
                  ibrahimgidado@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-500">Opening Hours</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Daily</p>
                  <p>4:00 PM - 12:00 AM</p>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg text-center">
              <p className="text-xs text-orange-400">🔥 Order now for fast delivery!</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-500/20 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
          <p className="text-gray-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Sandwich Club & Peppersoup. All rights reserved.
          </p>
          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-orange-500 transition">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500 transition">Terms of Service</a>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs mt-3">Made with ❤️ in Malete</p>
      </div>
    </footer>
  );
}
