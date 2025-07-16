import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-orange-600 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">NaijaFlex</h2>
          <p className="text-orange-100 text-sm">
            Your go-to store for timeless fashion accessories. Style that speaks your vibe.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-orange-100">
            <li><Link to="/" className="no-underline hover:text-white">Home</Link></li>
            <li><Link to="/shop" className="no-underline hover:text-white">Shop</Link></li>
            <li><Link to="/contact" className="no-underline hover:text-white">Contact</Link></li>
            <li><Link to="/cart" className="no-underline hover:text-white">Cart</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-orange-100">
            <li><a href="#" className="no-underline hover:text-white">FAQs</a></li>
            <li><a href="#" className="no-underline hover:text-white">Shipping & Returns</a></li>
            <li><a href="mailto:support@naijaflex.com" className="no-underline hover:text-white">Email Us</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <ul className="space-y-2 text-sm text-orange-100">
            <li><a href="#" className="no-underline hover:text-white">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@sha_ow002" className="no-underline hover:text-white">TikTok</a></li>
            <li><a href="https://x.com/codexmalik" className="no-underline hover:text-white">Twitter (X)</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-orange-500 mt-10 pt-6 text-center text-orange-200 text-sm">
        &copy; {new Date().getFullYear()} NaijaFlex. All rights reserved.
      </div>
    </footer>
  );
}
