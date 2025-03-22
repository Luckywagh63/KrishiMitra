"use client";
import React, { useState, useEffect } from "react";
import { Search, Filter, RefreshCw, MapPin, TrendingUp, TrendingDown, BarChart3, ShoppingCart, Sliders, ChevronDown, AlertCircle, ExternalLink } from "lucide-react";

export default function AgroPriceCompare() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [showFilters, setShowFilters] = useState(false);
  const [location, setLocation] = useState("All Locations");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [priceAlerts, setPriceAlerts] = useState([]);
  const [showPriceHistory, setShowPriceHistory] = useState(null);
  
  // Mock locations
  const locations = [
    "All Locations", "New Delhi", "Mumbai", "Bangalore", 
    "Chennai", "Kolkata", "Hyderabad", "Pune"
  ];
  
  // Mock product data with price history
  const mockProducts = [
    {
      id: 1,
      name: "NPK 15-15-15 Premium Blend",
      category: "fertilizer",
      type: "NPK Complex",
      manufacturer: "AgriGrow",
      size: "50 kg",
      prices: [
        { retailer: "AgroMart", price: 1250, stock: true, delivery: "2-3 days", rating: 4.2 },
        { retailer: "FarmSupply", price: 1280, stock: true, delivery: "1-2 days", rating: 4.5 },
        { retailer: "KisanStore", price: 1200, stock: true, delivery: "3-5 days", rating: 3.9 },
        { retailer: "GreenHarvest", price: 1320, stock: false, delivery: "Out of stock", rating: 4.1 }
      ],
      priceHistory: [
        { date: "Mar 2025", price: 1250 },
        { date: "Feb 2025", price: 1280 },
        { date: "Jan 2025", price: 1310 },
        { date: "Dec 2024", price: 1350 },
        { date: "Nov 2024", price: 1330 },
        { date: "Oct 2024", price: 1300 }
      ],
      specs: {
        nutrients: "N (15%), P (15%), K (15%)",
        application: "Suitable for most crops, particularly effective for balanced growth",
        certification: "BIS Certified"
      }
    },
    {
      id: 2,
      name: "Carbofuran 3G Insecticide",
      category: "pesticide",
      type: "Insecticide",
      manufacturer: "CropShield",
      size: "25 kg",
      prices: [
        { retailer: "AgroMart", price: 1850, stock: true, delivery: "2-3 days", rating: 4.0 },
        { retailer: "FarmSupply", price: 1790, stock: true, delivery: "1-2 days", rating: 4.3 },
        { retailer: "PestControl", price: 1880, stock: true, delivery: "Same day", rating: 4.7 },
        { retailer: "KisanStore", price: 1820, stock: false, delivery: "Out of stock", rating: 3.8 }
      ],
      priceHistory: [
        { date: "Mar 2025", price: 1850 },
        { date: "Feb 2025", price: 1880 },
        { date: "Jan 2025", price: 1900 },
        { date: "Dec 2024", price: 1920 },
        { date: "Nov 2024", price: 1880 },
        { date: "Oct 2024", price: 1850 }
      ],
      specs: {
        activeIngredient: "Carbofuran 3%",
        targetPests: "Soil and foliar insects, nematodes",
        certification: "CIB Approved"
      }
    },
    {
      id: 3,
      name: "Organic Vermicompost",
      category: "fertilizer",
      type: "Organic",
      manufacturer: "EcoFarms",
      size: "25 kg",
      prices: [
        { retailer: "OrganicGrow", price: 550, stock: true, delivery: "2-3 days", rating: 4.8 },
        { retailer: "FarmSupply", price: 580, stock: true, delivery: "1-2 days", rating: 4.4 },
        { retailer: "GreenHarvest", price: 520, stock: true, delivery: "3-4 days", rating: 4.6 },
        { retailer: "KisanStore", price: 590, stock: true, delivery: "2-3 days", rating: 4.2 }
      ],
      priceHistory: [
        { date: "Mar 2025", price: 550 },
        { date: "Feb 2025", price: 560 },
        { date: "Jan 2025", price: 580 },
        { date: "Dec 2024", price: 600 },
        { date: "Nov 2024", price: 590 },
        { date: "Oct 2024", price: 570 }
      ],
      specs: {
        nutrients: "Rich in NPK, micronutrients, and beneficial microbes",
        application: "All crops, especially effective for organic farming",
        certification: "Organic Certified"
      }
    },
    {
      id: 4,
      name: "Glyphosate 41% SL Herbicide",
      category: "pesticide",
      type: "Herbicide",
      manufacturer: "WeedClear",
      size: "5 L",
      prices: [
        { retailer: "AgroMart", price: 750, stock: false, delivery: "Out of stock", rating: 3.9 },
        { retailer: "FarmSupply", price: 780, stock: true, delivery: "1-2 days", rating: 4.1 },
        { retailer: "PestControl", price: 720, stock: true, delivery: "Same day", rating: 4.3 },
        { retailer: "GreenHarvest", price: 765, stock: true, delivery: "2-3 days", rating: 4.0 }
      ],
      priceHistory: [
        { date: "Mar 2025", price: 750 },
        { date: "Feb 2025", price: 770 },
        { date: "Jan 2025", price: 790 },
        { date: "Dec 2024", price: 780 },
        { date: "Nov 2024", price: 760 },
        { date: "Oct 2024", price: 740 }
      ],
      specs: {
        activeIngredient: "Glyphosate 41% SL",
        targetPests: "Broad spectrum weed control",
        certification: "CIB Registered"
      }
    },
    {
      id: 5,
      name: "Urea 46-0-0",
      category: "fertilizer",
      type: "Nitrogen",
      manufacturer: "NutriGro",
      size: "45 kg",
      prices: [
        { retailer: "AgroMart", price: 320, stock: true, delivery: "2-3 days", rating: 4.0 },
        { retailer: "FarmSupply", price: 315, stock: true, delivery: "1-2 days", rating: 4.2 },
        { retailer: "KisanStore", price: 330, stock: true, delivery: "Same day", rating: 4.5 },
        { retailer: "GreenHarvest", price: 335, stock: true, delivery: "2-3 days", rating: 3.9 }
      ],
      priceHistory: [
        { date: "Mar 2025", price: 320 },
        { date: "Feb 2025", price: 325 },
        { date: "Jan 2025", price: 330 },
        { date: "Dec 2024", price: 340 },
        { date: "Nov 2024", price: 335 },
        { date: "Oct 2024", price: 325 }
      ],
      specs: {
        nutrients: "Nitrogen (46%)",
        application: "Suitable for most crops, particularly leafy vegetables",
        certification: "FCO Certified"
      }
    },
    {
      id: 6,
      name: "DAP 18-46-0",
      category: "fertilizer",
      type: "Phosphorus",
      manufacturer: "GrowMax",
      size: "50 kg",
      prices: [
        { retailer: "AgroMart", price: 1450, stock: true, delivery: "3-4 days", rating: 4.3 },
        { retailer: "FarmSupply", price: 1425, stock: true, delivery: "2-3 days", rating: 4.5 },
        { retailer: "KisanStore", price: 1470, stock: true, delivery: "Same day", rating: 4.7 },
        { retailer: "GreenHarvest", price: 1480, stock: true, delivery: "3-5 days", rating: 4.0 }
      ],
      priceHistory: [
        { date: "Mar 2025", price: 1450 },
        { date: "Feb 2025", price: 1460 },
        { date: "Jan 2025", price: 1480 },
        { date: "Dec 2024", price: 1500 },
        { date: "Nov 2024", price: 1485 },
        { date: "Oct 2024", price: 1460 }
      ],
      specs: {
        nutrients: "Nitrogen (18%), Phosphorus (46%)",
        application: "Ideal for root development in early crop stages",
        certification: "FCO Certified"
      }
    },
    {
      id: 7,
      name: "Sulphur Bentonite 90%",
      category: "pesticide",
      type: "Sulphur",
      manufacturer: "SoilHealth",
      size: "25 kg",
      prices: [
        { retailer: "AgroMart", price: 850, stock: true, delivery: "3-4 days", "rating": 4.3 },
        { retailer: "FarmSupply", price: 820, stock: true, delivery: "2-3 days", "rating": 4.5 },
        { retailer: "KisanStore", price: 870, stock: true, delivery: "Same day", "rating": 4.6 },
        { retailer: "GreenHarvest", price: 890, stock: true, delivery: "3-5 days", "rating": 4.0 }
      ],
      "priceHistory": [
        { date: "Mar 2025", price: 850 },
        { date: "Feb 2025", price: 860 },
        { date: "Jan 2025", price: 880 },
        { date: "Dec 2024", price: 900 },
        { date: "Nov 2024", price: 875 },
        { date: "Oct 2024", price: 860 }
      ],
      "specs": {
        nutrients: "Sulphur (90%)",
        application: "Improves soil pH and enhances oilseed crop yields",
        certification: "FCO Certified"
      }
    },
    {
      id: 8,
      name: "Calcium Ammonium Nitrate (CAN) 26-0-0",
      category: "fertilizer",
      type: "Nitrogen",
      manufacturer: "GrowMore",
      size: "50 kg",
      prices: [
        { retailer: "AgroMart", price: 1400, stock: true, delivery: "2-3 days", rating: 4.4 },
        { retailer: "FarmSupply", price: 1380, stock: true, delivery: "1-2 days", rating: 4.6 },
        { retailer: "KisanStore", price: 1450, stock: true, delivery: "Same day", rating: 4.7 },
        { retailer: "GreenHarvest", price: 1475, stock: true, delivery: "3-4 days", rating: 4.1 }
      ],
      "priceHistory": [
        { date: "Mar 2025", price: 1400 },
        { date: "Feb 2025", price: 1420 },
        { date: "Jan 2025", price: 1450 },
        { date: "Dec 2024", price: 1480 },
        { date: "Nov 2024", price: 1460 },
        { date: "Oct 2024", price: 1420 }
      ],
      "specs": {
        nutrients: "Nitrogen (26%)",
        application: "Improves leaf growth and overall plant health",
        certification: "FCO Certified"
      }
    },
    {
      id: 9,
      name: "Imidacloprid 17.8% SL",
      category: "pesticide",
      type: "Insecticide",
      manufacturer: "CropDefend",
      size: "250 ml",
      prices: [
        { retailer: "AgroMart", price: 350, stock: true, delivery: "1-2 days", rating: 4.5 },
        { retailer: "FarmSupply", price: 340, stock: true, delivery: "Same day", rating: 4.7 },
        { retailer: "KisanStore", price: 360, stock: true, delivery: "2-3 days", rating: 4.4 },
        { retailer: "GreenHarvest", price: 370, stock: true, delivery: "3-4 days", rating: 4.1 }
      ],
      "priceHistory": [
        { date: "Mar 2025", price: 350 },
        { date: "Feb 2025", price: 355 },
        { date: "Jan 2025", price: 360 },
        { date: "Dec 2024", price: 370 }
      ],
      specs: {
        ingredients: "Imidacloprid (17.8%)",
        application: "Controls aphids, jassids, and whiteflies in vegetables and cotton",
        certification: "FCO Certified"
      }
    },
    {
      "id": 10,
      "name": "Mancozeb 75% WP",
      "category": "pesticide",
      "type": "Fungicide",
      "manufacturer": "PlantGuard",
      "size": "500 g",
      "prices": [
        { "retailer": "AgroMart", "price": 280, "stock": true, "delivery": "2-3 days", "rating": 4.0 },
        { "retailer": "FarmSupply", "price": 275, "stock": true, "delivery": "1-2 days", "rating": 4.3 },
        { "retailer": "KisanStore", "price": 290, "stock": true, "delivery": "Same day", "rating": 4.6 },
        { "retailer": "GreenHarvest", "price": 295, "stock": true, "delivery": "3-4 days", "rating": 3.9 }
      ],
      "priceHistory": [
        { "date": "Mar 2025", "price": 280 },
        { "date": "Feb 2025", "price": 285 },
        { "date": "Jan 2025", "price": 290 },
        { "date": "Dec 2024", "price": 300 }
      ],
      "specs": {
        "ingredients": "Mancozeb (75%)",
        "application": "Controls fungal diseases in potatoes, grapes, and tomatoes",
        "certification": "FCO Certified"
      }
    }

  ];
  
  // Price alert mock data
  const mockPriceAlerts = [
    {
      id: 1,
      productName: "NPK 15-15-15 Premium Blend",
      targetPrice: 1200,
      currentPrice: 1250,
      retailer: "AgroMart"
    },
    {
      id: 2,
      productName: "Carbofuran 3G Insecticide",
      targetPrice: 1700,
      currentPrice: 1790,
      retailer: "FarmSupply"
    }
  ];

  // Load data on component mount
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProducts(mockProducts);
      setPriceAlerts(mockPriceAlerts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter products based on search query, category and location
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    
    return matchesSearch && matchesCategory;
  });

  // Sort products based on sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const lowestPriceA = Math.min(...a.prices.map(p => p.price));
    const lowestPriceB = Math.min(...b.prices.map(p => p.price));
    
    if (sortBy === "price-low") {
      return lowestPriceA - lowestPriceB;
    } else if (sortBy === "price-high") {
      return lowestPriceB - lowestPriceA;
    } else if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // Function to get lowest price for a product
  const getLowestPrice = (prices) => {
    return Math.min(...prices.map(p => p.price));
  };

  // Function to get price trend (increasing or decreasing)
  const getPriceTrend = (priceHistory) => {
    if (priceHistory.length < 2) return 'stable';
    const current = priceHistory[0].price;
    const previous = priceHistory[1].price;
    
    if (current < previous) return 'down';
    if (current > previous) return 'up';
    return 'stable';
  };

  // Function to get price difference percentage
  const getPriceDiffPercent = (priceHistory) => {
    if (priceHistory.length < 2) return 0;
    const current = priceHistory[0].price;
    const previous = priceHistory[1].price;
    
    return Math.round((current - previous) / previous * 100);
  };

  // Function to toggle price history display
  const togglePriceHistory = (productId) => {
    if (showPriceHistory === productId) {
      setShowPriceHistory(null);
    } else {
      setShowPriceHistory(productId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">AgroPriceCompare</h1>
            <div className="flex space-x-4">
              <button className="bg-green-600 hover:bg-green-800 px-3 py-2 rounded-lg text-sm flex items-center">
                <MapPin size={16} className="mr-1" />
                {location}
              </button>
              <button className="bg-green-600 hover:bg-green-800 px-3 py-2 rounded-lg text-sm flex items-center">
                <ShoppingCart size={16} className="mr-1" />
                My Alerts
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {/* Search and filter section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search pesticides, fertilizers, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>
            
            <div className="flex space-x-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              >
                <option value="all">All Categories</option>
                <option value="fertilizer">Fertilizers</option>
                <option value="pesticide">Pesticides</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
              
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                <Filter size={18} />
              </button>
            </div>
          </div>
          
          {/* Advanced filters */}
          {showFilters && (
            <div className="mt-4 p-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>All Manufacturers</option>
                  <option>AgriGrow</option>
                  <option>CropShield</option>
                  <option>EcoFarms</option>
                  <option>WeedClear</option>
                  <option>NutriGro</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                  />
                  <span>to</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Stats and last updated */}
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <div>
              Showing {filteredProducts.length} products
            </div>
            <div className="flex items-center">
              <RefreshCw size={14} className="mr-1" />
              Last updated: Today, 10:15 AM
            </div>
          </div>
        </div>
        
        {/* Price alerts section */}
        {priceAlerts.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-3">
              <AlertCircle size={18} className="text-yellow-500 mr-2" />
              <h2 className="text-lg font-semibold">Price Alerts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {priceAlerts.map(alert => (
                <div key={alert.id} className="bg-white p-3 rounded-md border border-yellow-200 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{alert.productName}</p>
                    <p className="text-sm text-gray-600">
                      Target: ₹{alert.targetPrice} | Current: ₹{alert.currentPrice} at {alert.retailer}
                    </p>
                  </div>
                  <div className={`text-${alert.currentPrice <= alert.targetPrice ? 'green' : 'red'}-500`}>
                    {alert.currentPrice <= alert.targetPrice ? (
                      <span className="text-green-500 flex items-center">
                        <TrendingDown size={16} className="mr-1" /> 
                        Target met!
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center">
                        <TrendingUp size={16} className="mr-1" /> 
                        ₹{alert.currentPrice - alert.targetPrice} above
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Product listings */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="space-y-6">
            {sortedProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-5">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-start">
                        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                          product.category === 'fertilizer' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.category}
                        </span>
                      </div>
                      <p className="text-gray-600">{product.manufacturer} | {product.size} | {product.type}</p>
                      
                      <div className="mt-2 flex items-center">
                        <span className="font-medium">Best Price: ₹{getLowestPrice(product.prices)}</span>
                        {getPriceTrend(product.priceHistory) === 'down' && (
                          <span className="ml-2 flex items-center text-green-600 text-sm">
                            <TrendingDown size={14} className="mr-0.5" />
                            {Math.abs(getPriceDiffPercent(product.priceHistory))}% from last month
                          </span>
                        )}
                        {getPriceTrend(product.priceHistory) === 'up' && (
                          <span className="ml-2 flex items-center text-red-600 text-sm">
                            <TrendingUp size={14} className="mr-0.5" />
                            {getPriceDiffPercent(product.priceHistory)}% from last month
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => togglePriceHistory(product.id)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm flex items-center"
                      >
                        <BarChart3 size={14} className="mr-1" />
                        Price History
                      </button>
                      <button className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-sm flex items-center">
                        <Sliders size={14} className="mr-1" />
                        Set Alert
                      </button>
                    </div>
                  </div>
                  
                  {/* Price history chart */}
                  {showPriceHistory === product.id && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <h4 className="text-sm font-medium mb-3">Price History (6 Months)</h4>
                      <div className="h-32 flex items-end justify-between space-x-2">
                        {product.priceHistory.slice().reverse().map((item, index) => {
                          const maxPrice = Math.max(...product.priceHistory.map(p => p.price));
                          const minPrice = Math.min(...product.priceHistory.map(p => p.price));
                          const range = maxPrice - minPrice;
                          const heightPercentage = range === 0 
                            ? 50 
                            : ((item.price - minPrice) / range) * 80 + 20;
                          
                          return (
                            <div key={index} className="flex flex-col items-center flex-1">
                              <div className="text-xs text-gray-600 mb-1">₹{item.price}</div>
                              <div 
                                className={`w-full ${
                                  index < product.priceHistory.length - 1 && 
                                  item.price < product.priceHistory[product.priceHistory.length - 1 - index - 1].price 
                                    ? 'bg-green-400' 
                                    : index < product.priceHistory.length - 1 && 
                                      item.price > product.priceHistory[product.priceHistory.length - 1 - index - 1].price 
                                      ? 'bg-red-400' 
                                      : 'bg-blue-400'
                                }`} 
                                style={{ height: `${heightPercentage}%` }}
                              ></div>
                              <div className="text-xs text-gray-500 mt-1">{item.date}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Product specs */}
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    {product.category === 'fertilizer' ? (
                      <>
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="font-medium">Nutrients:</span> {product.specs.nutrients}
                        </div>
                        <div className="bg-gray-50 p-2 rounded md:col-span-2">
                          <span className="font-medium">Application:</span> {product.specs.application}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="font-medium">Active:</span> {product.specs.activeIngredient}
                        </div>
                        <div className="bg-gray-50 p-2 rounded md:col-span-2">
                          <span className="font-medium">Target Pests:</span> {product.specs.targetPests}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Retailer prices */}
                <div className="bg-gray-50">
                  <div className="grid grid-cols-1 divide-y divide-gray-200">
                    <div className="grid grid-cols-12 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100">
                      <div className="col-span-4">Retailer</div>
                      <div className="col-span-2 text-center">Price</div>
                      <div className="col-span-2 text-center">Stock</div>
                      <div className="col-span-2 text-center">Delivery</div>
                      <div className="col-span-2 text-center">Rating</div>
                    </div>
                    
                    {product.prices
                      .sort((a, b) => a.price - b.price)
                      .map((price, index) => (
                        <div key={index} className="grid grid-cols-12 px-4 py-3 items-center hover:bg-gray-100">
                          <div className="col-span-4 font-medium">{price.retailer}</div>
                          <div className="col-span-2 text-center font-bold">₹{price.price}</div>
                          <div className="col-span-2 text-center">
                            {price.stock ? (
                              <span className="text-green-600">In Stock</span>
                            ) : (
                              <span className="text-red-600">Out of Stock</span>
                            )}
                          </div>
                          <div className="col-span-2 text-center text-gray-600">{price.delivery}</div>
                          <div className="col-span-2 text-center">
                            <div className="flex items-center justify-center">
                              <span className="mr-1">{price.rating}</span>
                              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-yellow-400" 
                                  style={{ width: `${(price.rating / 5) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No products found matching your criteria.</p>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-10">
        <div className="container mx-auto px-4 md:flex md:justify-between text-sm text-gray-600">
          <div className="mb-4 md:mb-0">
            <p>© 2025 AgroPriceCompare</p>
            <p className="mt-1">Helping farmers make better purchasing decisions</p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-6">
            <a href="#" className="hover:text-green-700 mb-2 md:mb-0">About Us</a>
            <a href="#" className="hover:text-green-700 mb-2 md:mb-0">Contact</a>
            <a href="#" className="hover:text-green-700 mb-2 md:mb-0">Terms of Service</a>
            <a href="#" className="hover:text-green-700">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}