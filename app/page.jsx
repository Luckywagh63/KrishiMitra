"use client";
import { useState, useEffect, useRef } from "react";
import { FaLeaf, FaUpload, FaRobot, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Chatbot from "@/components/Chatbot";
import BarcodeScanner from '../components/BarcodeScanner';

export default function HomePage() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const whatWeDoRef = useRef(null);
  
  // Handle file upload logic
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://127.0.0.1:3000/output", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Error in prediction: ${response.statusText}`);
        }

        const data = await response.json();
        const fileUrl = URL.createObjectURL(file);

        router.push(
          `/output?prediction=${encodeURIComponent(data.prediction)}&confidence=${encodeURIComponent(data.confidence)}&image=${encodeURIComponent(fileUrl)}`
        );
      } catch (error) {
        console.error("Error while sending the image:", error);
        setError(error.message);
      }
    }
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // News data
  const newsItems = [
    {
      img: "/bajra.jpg",
      title: "⚠️ Leaf Rust Alert",
      desc: "Early detection and prevention strategies for the latest outbreak.",
      link: "https://www.agriculture.com/news",
    },
    {
      img: "/jute.jpg",
      title: "🌱 Organic Farming",
      desc: "New sustainable methods showing 30% yield increase across regions.",
      link: "https://www.farmprogress.com",
    },
    {
      img: "/ai.jpg",
      title: "🤖 AI Innovations",
      desc: "Smart monitoring systems now accessible to small-scale farmers.",
      link: "https://www.thehindubusinessline.com/economy/agri-business/",
    }
  ];

  return (
    <div className="font-sans overflow-hidden">
      {/* Hero Section - with 3D-like parallax effect */}
      <section className="relative h-screen overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-cover bg-center z-0 opacity-65" style={{ backgroundImage: "url('/gheu.jpg')" }}>

          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -100],
                x: [0, Math.random() * 50 - 25],
                opacity: [0.1, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col items-center justify-center px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <motion.div 
              className="mb-6 inline-block"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            >
              <FaLeaf className="text-white text-6xl mx-auto" />
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Sustainable Farming <br/> 
            </motion.h1>
            
            <motion.p
              className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Revolutionizing agriculture with intelligent crop monitoring, disease detection, and sustainable farming practices.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.button
                onClick={() => document.getElementById("fileInput").click()}
                className="px-8 py-4 bg-yellow-500 text-green-900 font-bold rounded-full text-lg flex items-center justify-center shadow-lg hover:bg-yellow-400 transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUpload className="mr-2" /> Analyze Your Crop
              </motion.button>
              <input id="fileInput" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              
              <motion.button
                onClick={() => scrollToSection(whatWeDoRef)}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full text-lg flex items-center justify-center hover:bg-white/30 transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaChevronDown className="text-white text-3xl" />
          </motion.div>
        </div>
      </section>

        {/* Barcode Scanner Section */}
        <section className="py-10 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Scan Fertilizer Product Barcode</h2>
          <BarcodeScanner />
        </div>
            </section>

      {/* What We Do Section - with 3D card hover effects */}
      <section ref={whatWeDoRef} className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block relative">
              Our Approach
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-green-500" 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "AI Detection",
                desc: "Our AI algorithms detect crop diseases with 98% accuracy from simple photos."
              },
              {
                icon: "🌿",
                title: "Sustainable Solutions",
                desc: "Environmentally friendly treatment recommendations based on detected issues."
              },
              {
                icon: "📊",
                title: "Growth Monitoring",
                desc: "Track your crop's health over time with detailed analytics and insights."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"  
                }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section - With horizontal scroll */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-emerald-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Latest Crop News
          </motion.h2>

          <div className="overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex gap-6 min-w-max">
              {newsItems.map((news, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl w-80 overflow-hidden flex-shrink-0"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={news.img} 
                      alt={news.title} 
                      className="w-full h-full object-cover hover:scale-110 transition duration-500" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{news.title}</h3>
                    <p className="text-white/80 mb-4">{news.desc}</p>
                    <a href={news.link} target="_blank" className="text-white font-semibold text-sm mt-2 inline-block">
                    Read More →
                  </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - With particles effect */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-yellow-400 to-amber-600">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready to transform your farming?
          </motion.h2>
          
          <motion.p
            className="text-white/90 text-xl mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Upload your crop images now and get instant AI-powered analysis and recommendations.
          </motion.p>
          
          <motion.button
            onClick={() => document.getElementById("fileInputCta").click()}
            className="px-8 py-4 bg-white text-amber-600 font-bold rounded-full text-lg flex items-center justify-center mx-auto shadow-lg hover:bg-gray-100 transition cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <FaUpload className="mr-2" /> Upload & Analyze
          </motion.button>
          <input id="fileInputCta" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </div>
      </section>

      {/* Chatbot Floating Button*
      <motion.button
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaRobot className="text-2xl" />
      </motion.button> */}

      <Chatbot/>

      {/* Chatbot Component
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <Chatbot onClose={() => setIsChatbotOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence> */}
      
      {/* Error Toast */}
      <AnimatePresence>
        {error && (
          <motion.div 
            className="fixed bottom-24 right-6 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {error}
            <button className="ml-4 font-bold" onClick={() => setError(null)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for custom scrollbar hiding */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
  
}