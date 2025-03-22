"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for menu toggle
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
         <Link href="/" className="text-xl font-bold"> KrishiMitra  </Link>


          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-200">Home</Link>
            <Link href="/browse" className="hover:text-gray-200">Browse</Link>
            <Link href="/weather" className="hover:text-gray-200">Weather</Link>
            <Link href="/links" className="hover:text-gray-200">Links</Link>
            <Link href="/treatment" className="hover:text-gray-200">Treatment</Link>
            <Link href="/contact" className="hover:text-gray-200">Contact</Link>
            <Link href="/soil" className="hover:text-gray-200">Soil</Link> 
            <Link href="/organic" className="hover:text-gray-200">Organic</Link>
          </div>

          {/* Mobile Menu Button with Cursor Change */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="cursor-pointer hover:cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-700 p-4 space-y-4 cursor-pointer">
          <Link href="/" className="block hover:text-gray-200">Home</Link>
          <Link href="/diagnosis" className="block hover:text-gray-200">Browse</Link>
          <Link href="/weather" className="block hover:text-gray-200">Links</Link>
          <Link href="/chatbot" className="block hover:text-gray-200">Treatement</Link>
          <Link href="/about" className="block hover:text-gray-200">Treatement</Link>
        </div>
      )}
    </nav>
  );
}
