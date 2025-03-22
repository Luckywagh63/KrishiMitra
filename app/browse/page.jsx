"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function OutputPage() {
  const router = useRouter();
  const { query } = router;
  const image = query?.image;
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCrops, setVisibleCrops] = useState(6);

  // Crop data (weather, temperature, rainfall, and soil conditions)
  const cropData = {
    Rice: {
      temperature: "15°-27° C",
      rainfall: "100-150 cm",
      soil: "Heavy-clayey to clayey-loam",
      image: "rice.jpg",
      description: "Rice thrives in warm and humid climates with temperatures between 20-35°C. It requires heavy rainfall ranging from 100-200 cm or adequate irrigation for optimal growth. Clayey or loamy soils that retain water are ideal for rice cultivation. This crop is mainly grown in lowlands or waterlogged areas, making it a staple food for many countries. Asia is the largest producer of rice globally, with India and China leading the production.",
      category: "cereals"
    },
    
    Wheat: {
      temperature: "12°-25°C",
      rainfall: "25-75 cm",
      soil: "Well-drained-light clay to heavy clay",
      image: "wheat.jpg",
      description: "Wheat prefers a cool growing season with temperatures of 10-25°C, making it suitable for temperate climates. It requires moderate rainfall of about 50-75 cm and cannot tolerate waterlogged conditions. The crop grows best in well-drained loamy or clayey soil. Wheat is widely cultivated in regions with distinct winter and spring seasons, such as North America, Europe, and parts of Asia. It is a major source of carbohydrates worldwide.",
      category: "cereals"
    },
    Maize: {
      temperature: "15°-27°C",
      rainfall: "65-125 cm",
      soil: "Deep-heavy clay to light sandy loam",
      image: "maize.jpg",
      description: "Maize, also known as corn, thrives in warm climates with temperatures between 21°-27°C. It requires moderate rainfall of about 50-100 cm and grows well in fertile, well-drained loamy soils. Maize is a versatile crop used for food, animal feed, and industrial purposes. It is widely cultivated in countries like the USA, China, and Brazil and is a staple crop in many regions.",
      category: "cereals"
    },
    Millets: {
      temperature: "20°-35°C",
      rainfall: "25-75 cm",
      soil: "Sandy-loam to clayey loam",
      image: "millets.jpg",
      description: "Millets are hardy crops that grow in dry, hot regions with minimal rainfall. They thrive in sandy or light soils and are highly drought-resistant. Popular millets include sorghum, finger millet, and foxtail millet. They are nutritionally dense, rich in proteins and minerals, and are often cultivated in arid regions of Africa and India. Millets are increasingly promoted for sustainable agriculture.",
      category: "cereals"
    },
    Bajra: {
      temperature: "25°-35°C",
      rainfall: "25-60 cm",
      soil: "Sandy loam to loam",
      image: "bajra.jpg",
      description: "Bajra grows well in hot and dry climates, with an optimal temperature range of 25-30°C. It is a drought-tolerant crop that requires 40-60 cm of rainfall and is suited for sandy or light soils with good drainage. This hardy crop is often cultivated in arid and semi-arid regions, particularly in India and Africa. Bajra is known for its nutritional value, being rich in iron and other essential nutrients.",
      category: "cereals"
    },
    Pulses: {
      temperature: "20°-27°C",
      rainfall: "25-60 cm",
      soil: "Sandy-loam",
      producers: "India: Madhya Pradesh, Rajasthan, Uttar Pradesh, Maharashtra, Punjab, Haryana, Andhra Pradesh, Karnataka, Tamil Nadu, West Bengal",
      image: "pulses.jpg",
      description: "Pulses, including lentils, chickpeas, and black gram, thrive in warm climates with temperatures ranging from 20°-30°C. They require low to moderate rainfall of about 30-75 cm and are best suited for well-drained loamy or sandy soils. Pulses are nitrogen-fixing crops that improve soil fertility and are a vital source of protein and nutrients. India is the largest producer and consumer of pulses, making them an essential part of the diet in many countries.",
      category: "legumes"
    },
    Lentil: {
      temperature: "15°-25°C",
      rainfall: "25-50 cm",
      soil: "Loamy to clayey loam",
      image: "lentil.jpg",
      description: "Pulses, including lentils, chickpeas, and black gram, thrive in warm climates with temperatures ranging from 20°-30°C. They require low to moderate rainfall of about 30-75 cm and are best suited for well-drained loamy or sandy soils. Pulses are nitrogen-fixing crops that improve soil fertility and are a vital source of protein and nutrients. India is the largest producer and consumer of pulses, making them an essential part of the diet in many countries.",
      category: "legumes"
    },
    Oilseeds: {
      temperature: "15°-30°C",
      rainfall: "30-50 cm",
      soil: "Loam to clayey loam",
      image: "oilseeds.jpg",
      description:"Oilseed crops, including mustard, sunflower, and sesame, thrive in varied climates depending on the type. Generally, they prefer warm climates and moderate rainfall ranging from 50-100 cm. Fertile, well-drained loamy soils are ideal for these crops. Oilseeds are a major source of vegetable oils and are widely used in cooking, biofuels, and industry. Countries like India, China, and Argentina are major producers.",
      category: "oilseeds"
    },
    Groundnut: {
      temperature: "20°-30°C",
      rainfall: "50-75 cm",
      soil: "Well-drained-sandy loams, red and black cotton",
      image: "groundnut.jpg",
      description:"Groundnut thrives in warm climates with temperatures of 20-30°C. It requires moderate rainfall between 50-75 cm, with well-distributed moisture throughout the growing season. Sandy loam or black soils rich in organic matter are ideal for groundnut cultivation. Groundnuts are a major oilseed crop and are also consumed as snacks. They are widely grown in India, China, and the USA.",
      category: "oilseeds"
    },
    Sugarcane: {
      temperature: "20°-35°C",
      rainfall: "85-165 cm",
      soil: "Well-drained alluvium, black, red and brown regur soil",
      image: "sugarcane.jpg",
      description:"Sugarcane flourishes in tropical and subtropical climates with temperatures of 20-35°C. It has a high water demand, requiring 75-150 cm of rainfall or irrigation. Deep, fertile loamy or clayey soils with good drainage are suitable for its growth. Sugarcane is the main source of sugar production globally and is also used for ethanol production. Brazil, India, and Thailand are the leading producers of sugarcane.",
      category: "cash crops"
    },
    SugarBeet: {
      temperature: "10°-25°C",
      rainfall: "25-50 cm",
      soil: "Well-drained-loamy soil",
      producers: "France, USA, Germany, Russia, China, Ukraine, Poland, Turkey",
      image: "sugarbeet.jpg",
      description:"Sugar beet grows in cool temperate climates with temperatures of 15-20°C. It requires moderate rainfall of 50-70 cm and well-drained loamy soils rich in organic matter. Sugar beet is grown for sugar extraction and animal feed. It is primarily cultivated in Europe, the USA, and Russia. The crop has a shorter growing season compared to sugarcane.",
      category: "cash crops"
    },
    Cotton: {
      temperature: "18°-27°C",
      rainfall: "60-110 cm",
      soil: "Well-drained loam, and regur (black-earth)",
      image: "cotton.jpg",
      description:"Cotton grows best in warm, dry climates with temperatures ranging from 21°-30°C. It requires moderate rainfall of about 50-100 cm, along with well-drained, loamy soils that allow good water retention. Cotton is a major cash crop, primarily grown for its fibers used in the textile industry. Major producers include India, China, and the USA. The cotton plant requires a long growing season and thrives in areas with plenty of sunshine, making it suitable for tropical and subtropical regions.",
      category: "fiber crops"
    },
    Tea: {
      temperature: "15°-35°C",
      rainfall: "100-250 cm",
      soil: "Well-drained, light loamy soil",
      producers: "India, China, Sri Lanka, Kenya, Indonesia, Bangladesh, Turkey",
      image: "tea.jpg",
      description:"Tea thrives in tropical and subtropical climates with temperatures between 18°-30°C. It requires abundant rainfall, around 150-250 cm annually, and well-drained, acidic soils. Tea plants prefer high altitudes with cool and misty conditions, which help develop the flavor and aroma of the leaves. Major producers of tea include China, India, and Kenya, where it is cultivated in large plantations. Tea is not only a popular beverage but also an important economic crop in many countries.",
      category: "beverage crops"
    },
    Coffee: {
      temperature: "15°-28°C",
      rainfall: "125-225 cm",
      image: "coffee.jpg",
      description:"Coffee grows best in tropical climates with temperatures ranging from 18°-24°C. It requires abundant rainfall of about 100-150 cm annually and well-drained, fertile soils rich in organic matter. Coffee plants thrive at higher altitudes, often in mountainous regions, which contribute to the development of the distinct flavors of the beans. Major coffee producers include Brazil, Vietnam, and Colombia. Coffee is one of the most widely consumed beverages worldwide and a significant cash crop in many countries.",
      category: "beverage crops"
    },
    Cocoa: {
      temperature: "18°-35°C",
      rainfall: "100-250 cm",
      soil: "Well-drained alluvium",
      image: "cocoa.jpg",
      description:"Cocoa thrives in hot, humid climates with temperatures between 21°-30°C. It requires heavy rainfall, approximately 100-250 cm annually, and well-drained, fertile soils that are slightly acidic. Cocoa plants prefer shaded areas and are typically grown in tropical regions, particularly in West Africa, Latin America, and Southeast Asia. The seeds, or beans, are used to produce chocolate and other cocoa-based products, making cocoa a highly valuable crop for the global confectionery industry.",
      category: "beverage crops"
    },
    Rubber: {
      temperature: "27°C",
      rainfall: "150-250 cm",
      soil: "Rich-well-drained alluvial soil",
      image: "rubber.jpg",
      description:"Rubber grows best in hot and humid climates with temperatures ranging from 25°-35°C. It requires high rainfall, about 150-250 cm annually, and well-drained, fertile soils. Rubber trees thrive in tropical regions, especially in countries like Thailand, Indonesia, and Malaysia, which are the largest producers. The latex extracted from rubber trees is used for manufacturing various products, including tires, footwear, and medical supplies. Rubber cultivation requires several years of growth before tapping for latex, making it a long-term investment for farmers.",
      category: "industrial crops"
    },
    Jute: {
      temperature: "25°-35°C",
      rainfall: "150-250 cm",
      soil: "Well-drained alluvial soil",
      image: "jute.jpg",
      description:"Jute thrives in warm, humid climates with temperatures between 25°-35°C. It requires heavy rainfall of about 150-250 cm annually and grows best in well-drained, fertile, loamy soils. Jute is primarily cultivated in countries like India and Bangladesh, where it is used to produce burlap, ropes, and sacks. The plant grows quickly, typically in 4-6 months, and is highly valued for its strong, biodegradable fibers. Jute is also an eco-friendly alternative to synthetic materials, making it an important crop in the textile and packaging industries.",
      category: "fiber crops"
    },
    Flax: {
      temperature: "10°-20°C",
      rainfall: "15-20 cm",
      soil: "Rich loam or clayey loam",
      image: "flax.jpg",
      description:"Flax thrives in temperate climates with cool to moderate temperatures ranging from 15°-20°C. It requires moderate rainfall of around 50-100 cm annually and grows best in well-drained, fertile loamy or sandy soils. Flax is primarily cultivated for its seeds, which are used to produce flaxseed oil, and its fibers, which are used to make linen fabric. Major producers include Canada, Russia, and Europe. Flax is known for its high nutritional value and versatility in both food and textile industries.",
      category: "fiber crops"
    },
    Coconut: {
      temperature: "27°C",
      rainfall: "100-250 cm, up to 600 m above sea level",
      soil: "Lateritic red, sandy alluvial sandy",
      image: "coconut.jpg",
      description:"Coconut trees thrive in tropical climates with temperatures ranging from 27°-32°C. They require high rainfall, typically 150-250 cm annually, and well-drained, sandy or loamy soils. Coconuts are grown primarily in coastal areas and are a major crop in countries like Indonesia, the Philippines, and India. The fruit's meat, milk, and oil are used in various culinary, cosmetic, and medicinal applications. Coconuts also have economic importance in the production of coir, a fiber used in ropes and mats. The coconut tree is often referred to as the tree of life due to its wide range of uses.",
      category: "plantation crops"
    },
    OilPalm: {
      temperature: "27°-33°C (maximum), 22°-24°C (minimum)",
      rainfall: "250-400 cm well distributed in the year",
      soil: "Deep-loamy and alluvial soil",
      image: "oilpalm.jpg",
      description:"Oil palm thrives in tropical climates with temperatures ranging from 24°-30°C. It requires high rainfall, approximately 2000-3000 mm annually, and well-drained, fertile soils. Oil palm is primarily cultivated in Southeast Asia, particularly in Malaysia and Indonesia, which are the largest producers. The palm produces fruits from which palm oil is extracted, a widely used vegetable oil in food, cosmetics, and biofuels. Oil palm plantations require extensive land and several years for the trees to mature, but they are highly productive once established, making them a key economic crop.",
      category: "plantation crops"
    },
    Clove: {
      temperature: "25°-35°C",
      rainfall: "200-250 cm",
      soil: "Red alluvial soil",
      image: "clove.jpg",
      description:"Clove thrives in tropical climates with temperatures ranging from 20°-30°C. It requires high rainfall of around 150-250 cm annually and grows best in well-drained, loamy or volcanic soils. Clove trees are typically grown at elevations of 400-800 meters above sea level. Major producers include Indonesia, Madagascar, and Sri Lanka. The aromatic flower buds of the clove tree are harvested and dried to produce a spice used in cooking, medicine, and fragrances. Cloves have been valued for their strong flavor and antiseptic properties for centuries.",
      category: "spices"
    },
    BlackPepper: {
      temperature: "15°-40°C",
      rainfall: "200-300 cm. Height up to 1500 m above sea level",
      soil: "Rich in humus, red-loam to sandy loam, and red lateritic sandy loam",
      image: "blackpepper.jpg",
      description:"Black pepper thrives in tropical climates with temperatures ranging from 20°-30°C. It requires high rainfall of about 150-250 cm annually and well-drained, fertile soils rich in organic matter. Black pepper plants are climbing vines that grow best in shaded areas and need support from trees or trellises. Major producers include India, Vietnam, and Indonesia. The peppercorns, which are the dried fruit of the plant, are used as a spice and are one of the most widely traded spices in the world. Black pepper is prized for its sharp, spicy flavor and medicinal properties.",
      category: "spices"
    },
    Cardamom: {
      temperature: "10°-35°C",
      rainfall: "150-400 cm, height 600-1500 m",
      soil: "Well-drained lateritic",
      image: "cardamom.jpg",
      description:"Cardamom thrives in tropical climates with temperatures ranging from 20°-30°C. It requires high rainfall of around 150-250 cm annually and grows best in well-drained, fertile, and slightly acidic soils. Cardamom plants prefer shaded environments and are typically grown in forests or plantations with partial sunlight. India, Guatemala, and Sri Lanka are the leading producers of cardamom. The aromatic seeds of the cardamom pods are used as a spice in cooking, beverages, and medicine, prized for their unique, sweet, and pungent flavor. It is often used in both savory and sweet dishes and is a key ingredient in many cultural cuisines.",
      category: "spices"
    },
    Turmeric: {
      temperature: "20°-30°C",
      rainfall: "150-250 cm",
      soil: "Well-drained clayey loam or red loamy soil",
      image: "turmeric.jpg",
      description:"Turmeric thrives in tropical climates with temperatures ranging from 20°-30°C. It requires abundant rainfall, approximately 150-250 cm annually, and well-drained, fertile, and slightly acidic soils. Turmeric is typically grown in regions with high humidity and well-irrigated fields. India is the largest producer of turmeric, which is mainly cultivated in the southern and eastern parts of the country. The rhizomes of the turmeric plant are harvested and dried to produce the bright yellow spice known for its distinctive flavor and medicinal properties. Turmeric is widely used in cooking, particularly in curries, and has been valued for its anti-inflammatory and antioxidant benefits in traditional medicine.",
      category: "spices"
    },
  };

  // Define categories for filtering
  const categories = [
    { id: "all", name: "All Crops" },
    { id: "cereals", name: "Cereals" },
    { id: "legumes", name: "Legumes" },
    { id: "oilseeds", name: "Oilseeds" },
    { id: "cash crops", name: "Cash Crops" },
    { id: "fiber crops", name: "Fiber Crops" },
    { id: "beverage crops", name: "Beverage Crops" },
    { id: "spices", name: "Spices" },
    { id: "plantation crops", name: "Plantation Crops" },
    { id: "industrial crops", name: "Industrial Crops" }
  ];

  // Load more crops
  const loadMore = () => {
    setVisibleCrops(prevCount => prevCount + 6);
  };

  useEffect(() => {
    if (image) {
      fetch("/api/diagnose", {
        method: "POST",
        body: JSON.stringify({ image }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.results) {
            setResults(data.results);
          } else {
            console.error("No results found in the response data");
            setResults([]);
          }
        })
        .catch((error) => console.error("Error fetching diagnosis:", error));
    }
  }, [image]);

  // Filter crops based on category and search term
  const filteredCrops = Object.entries(cropData)
    .filter(([name, data]) => {
      const matchesCategory = activeTab === "all" || data.category === activeTab;
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           data.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .slice(0, visibleCrops);

  return (
    <div className="bg-gradient-to-r from-green-950 to-slate-500 min-h-screen text-white">
      {/* Hero Section with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-80 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/api/placeholder/1200/800')" }}></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-4 text-white"
          >
            Crop Analysis Database
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl max-w-2xl mx-auto"
          >
            Find the perfect growing conditions for various crops around the world
          </motion.p>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search crops by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    activeTab === category.id 
                      ? "bg-green-600 text-white" 
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Crop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCrops.map(([cropName, cropInfo], index) => (
            <motion.div
              key={cropName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={cropInfo.image || `/api/placeholder/400/300?text=${cropName}`}
                  alt={cropName}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 rounded-bl-lg text-sm">
                  {cropInfo.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{cropName}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <span className="text-sm">{cropInfo.temperature}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                    </svg>
                    <span className="text-sm">{cropInfo.rainfall}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-brown-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    <span className="text-sm">{cropInfo.soil}</span>
                  </div>
                </div>
                
                <p className="text-sm text-white/80 line-clamp-3 mb-4">{cropInfo.description}</p>
                
                {/* <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 w-full">
                  View Details
                </button> */}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Load More Button */}
        {Object.keys(cropData).length > visibleCrops && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <button 
              onClick={loadMore}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-green-900 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 flex items-center space-x-2"
            >
              <span>Load More Crops</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="bg-black/30 backdrop-blur-md mt-16 py-10"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60">© 2025 Crop Analysis Database. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}