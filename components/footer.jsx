import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="text-gray-300 py-8 mt-0 bg-gradient-to-r from-green-950 to-slate-500   pb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-white">Mavericks</h2>
            <p className="mt-2 text-sm">
            Crop Diagnostics Made Easy
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-2 space-y-2">
            <li><Link href="/" className="hover:text-green-400 transition">Home</Link></li>
            <li><Link href="/browse" className="hover:text-green-400 transition">Browse</Link></li>
            <li><Link href="/links" className="hover:text-green-400 transition">Links</Link></li>
            <li><Link href="/treatment" className="hover:text-green-400 transition">Treatment</Link></li>
            <li><Link href="/contact" className="hover:text-green-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
              <a href="/" className="hover:text-blue-500 transition">
                <FaFacebook size={24} />
              </a>
              <a href="/" className="hover:text-blue-400 transition">
                <FaTwitter size={24} />
              </a>
              <a href="/" className="hover:text-pink-500 transition">
                <FaInstagram size={24} />
              </a>
              <a href="/" className="hover:text-blue-600 transition">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Mavericks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
