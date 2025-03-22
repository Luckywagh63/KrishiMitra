"use client";
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Search, X, Leaf, Menu, ChevronDown } from 'lucide-react';

export default function OrganicFarming() {
  const [activeTab, setActiveTab] = useState('composting');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Data for organic farming methods
  const organicMethods = {
    composting: [
      {
        title: "Hot Composting Method",
        materials: "Green waste (grass clippings, vegetable scraps), brown waste (dried leaves, straw), water",
        ratio: "2 parts brown material : 1 part green material",
        application: "Apply 1-2 inches as a top dressing or work 4-6 inches into soil before planting",
        benefits: "Faster decomposition, kills weed seeds and pathogens, rich in nutrients",
        instructions: "Layer materials, maintain moisture like a wrung-out sponge, turn pile weekly to maintain 130-150°F",
        category: "composting"
      },
      {
        title: "Vermicomposting",
        materials: "Food scraps, paper, cardboard, red wiggler worms",
        ratio: "1 pound of worms per half pound of food waste daily",
        application: "Apply ½ inch around plants monthly or use as 20% of potting mix",
        benefits: "Rich in microbes, contains worm castings with plant growth hormones, improves soil structure",
        instructions: "Maintain bedding at 60-80°F, feed worms regularly with food scraps, harvest castings every 3-6 months",
        category: "composting"
      },
      {
        title: "Compost Tea",
        materials: "Finished compost, water, molasses, aeration system",
        ratio: "1 part compost : 5 parts water, 1 tablespoon molasses per gallon",
        application: "Dilute at 1:4 ratio and spray on foliage or soil drench at 5 gallons per acre",
        benefits: "Boosts microbial activity, adds beneficial bacteria and fungi, quick nutrient delivery",
        instructions: "Steep compost in water for 24-36 hours with continuous aeration, strain and use immediately",
        category: "composting"
      }
    ],
    manures: [
      {
        title: "Cow Manure",
        aging: "Age for 3-6 months before application",
        npkRatio: "0.5-0.5-0.5",
        application: "25-30 pounds per 100 square feet",
        bestFor: "Heavy feeders like corn, tomatoes, and squash",
        notes: "Good all-purpose manure, improves soil structure, moderate nutrient content",
        category: "manures"
      },
      {
        title: "Chicken Manure",
        aging: "Age for 6-12 months before application",
        npkRatio: "1.1-1.4-0.6",
        application: "5-10 pounds per 100 square feet",
        bestFor: "Leafy greens, brassicas, and nitrogen-loving crops",
        notes: "Very high in nitrogen, can burn plants if not properly composted",
        category: "manures"
      },
      {
        title: "Horse Manure",
        aging: "Age for 4-6 months before application",
        npkRatio: "0.7-0.3-0.6",
        application: "20-30 pounds per 100 square feet",
        bestFor: "Root vegetables, fruit trees, and perennials",
        notes: "May contain weed seeds, good for improving soil texture",
        category: "manures"
      },
      {
        title: "Sheep/Goat Manure",
        aging: "Age for 3-4 months before application",
        npkRatio: "0.7-0.3-0.9",
        application: "15-20 pounds per 100 square feet",
        bestFor: "Herbs, berries, and flowering plants",
        notes: "Slow-release nutrients, less likely to burn plants, good for sandy soils",
        category: "manures"
      }
    ],
    naturalFertilizers: [
      {
        title: "Fish Emulsion",
        source: "Fish waste by-products",
        npkRatio: "5-2-2",
        application: "Dilute 1 tablespoon per gallon of water, apply every 2-3 weeks",
        benefits: "Quick nitrogen release, contains trace minerals, good for seedlings",
        limitations: "Strong odor, short-term effect",
        category: "naturalFertilizers"
      },
      {
        title: "Seaweed/Kelp Extract",
        source: "Processed seaweed",
        npkRatio: "1-0.5-2.5 (with many trace elements)",
        application: "Dilute 1 ounce per gallon of water, apply monthly as foliar spray",
        benefits: "Rich in growth hormones and micronutrients, improves stress resistance",
        limitations: "Low in major nutrients, best as supplement to other fertilizers",
        category: "naturalFertilizers"
      },
      {
        title: "Bone Meal",
        source: "Ground animal bones",
        npkRatio: "3-15-0",
        application: "2-3 pounds per 100 square feet worked into soil",
        benefits: "Excellent phosphorus source, promotes root and flower development",
        limitations: "Slow release, may attract animals, needs acidic soil to be effective",
        category: "naturalFertilizers"
      },
      {
        title: "Green Manure Cover Crops",
        source: "Legumes (clover, vetch), grasses (rye, oats)",
        npkRatio: "Varies by crop (legumes fix nitrogen)",
        application: "Sow in fall or early spring, till into soil 2-3 weeks before planting",
        benefits: "Adds organic matter, prevents erosion, improves soil structure, suppresses weeds",
        limitations: "Requires planning and growing space, timing is important",
        category: "naturalFertilizers"
      }
    ],
    cropyield: [
      {
        title: "Crop Rotation",
        method: "Rotate crop families in a 3-4 year cycle",
        benefits: "Prevents pest/disease buildup, balances soil nutrients, increases yields by 10-25%",
        implementation: "Follow heavy feeders with light feeders, then soil builders. Example: Tomatoes → Beans → Root vegetables → Leafy greens",
        crops: "All crops benefit from rotation planning",
        category: "cropyield"
      },
      {
        title: "Companion Planting",
        method: "Strategic placement of mutually beneficial plants",
        benefits: "Natural pest control, improved pollination, maximizes space, increases yields by 5-15%",
        implementation: "Plant companions within 18 inches: Tomatoes + Basil, Corn + Beans + Squash, Carrots + Onions",
        crops: "Most vegetables benefit from specific companions",
        category: "cropyield"
      },
      {
        title: "Mulching",
        method: "Apply 2-3 inch organic mulch layer around plants",
        benefits: "Conserves moisture, suppresses weeds, moderates soil temperature, increases yields by 15-25%",
        implementation: "Apply after soil has warmed, keep 1-2 inches away from plant stems",
        crops: "Tomatoes, peppers, squash, berries, fruit trees",
        category: "cropyield"
      },
      {
        title: "Microbial Inoculants",
        method: "Add beneficial microorganisms to soil or seeds",
        benefits: "Improves nutrient uptake, enhances root development, increases yields by 10-20%",
        implementation: "Apply mycorrhizal fungi to roots at transplanting, or use bacterial inoculants for seeds",
        crops: "Legumes (for rhizobium), most vegetables for mycorrhizae",
        category: "cropyield"
      }
    ]
  };

  // Function to search through all methods
  const searchAllMethods = (query) => {
    if (!query) return [];
    
    const allMethods = [
      ...organicMethods.composting,
      ...organicMethods.manures,
      ...organicMethods.naturalFertilizers,
      ...organicMethods.cropyield
    ];
    
    const results = allMethods.filter(method => {
      return Object.values(method).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query.toLowerCase());
        }
        return false;
      });
    });
    
    return results;
  };

  // Handle search when the query changes
  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const results = searchAllMethods(searchQuery);
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Function to render a method card based on its category
  const renderMethodCard = (method) => {
    switch(method.category) {
      case 'composting':
        return (
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-lime-100 px-5 py-4 border-b border-lime-200 flex items-center">
              <div className="bg-lime-200 rounded-full p-2 mr-3">
                <Leaf className="h-5 w-5 text-lime-700" />
              </div>
              <h3 className="font-bold text-xl text-gray-900">{method.title}</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <span className="font-semibold text-gray-800 block mb-1">Materials</span>
                <p className="text-gray-600 bg-gray-50 p-2 rounded">{method.materials}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-gray-800 block mb-1">Ratio</span>
                  <p className="text-gray-600">{method.ratio}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-800 block mb-1">Application</span>
                  <p className="text-gray-600">{method.application}</p>
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-800 block mb-1">Benefits</span>
                <p className="text-gray-600">{method.benefits}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-800 block mb-1">Instructions</span>
                <p className="text-gray-600">{method.instructions}</p>
              </div>
            </div>
          </div>
        );
      case 'manures':
        return (
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-amber-100 px-4 py-3 border-b border-amber-200">
              <h3 className="font-bold text-lg text-gray-900">{method.title}</h3>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span className="font-semibold text-sm text-gray-800">Aging Period</span>
                <p className="text-gray-600 text-sm font-medium">{method.aging}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-gray-800">NPK Ratio</span>
                <div className="flex space-x-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">N: {method.npkRatio.split('-')[0]}</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">P: {method.npkRatio.split('-')[1]}</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">K: {method.npkRatio.split('-')[2]}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-gray-800">Application Rate</span>
                <p className="text-gray-600 text-sm">{method.application}</p>
              </div>
              <div>
                <span className="font-semibold text-sm text-gray-800 block mb-1">Best For</span>
                <p className="text-gray-600 text-sm bg-gray-50 p-2 rounded">{method.bestFor}</p>
              </div>
              <div>
                <span className="font-semibold text-sm text-gray-800 block mb-1">Notes</span>
                <p className="text-gray-600 text-sm italic">{method.notes}</p>
              </div>
            </div>
          </div>
        );
      case 'naturalFertilizers':
        return (
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-green-100 p-4 border-b border-green-200">
              <h3 className="font-bold text-lg text-gray-900">{method.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{method.source}</p>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-gray-50 p-4 rounded flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">NPK Ratio</p>
                  <p className="text-lg font-bold text-gray-800">{method.npkRatio}</p>
                </div>
              </div>
              <div>
                <span className="font-semibold text-sm text-gray-800 block mb-1">Application</span>
                <p className="text-gray-600 text-sm">{method.application}</p>
              </div>
              <div>
                <span className="font-semibold text-sm text-gray-800 block mb-1">Benefits</span>
                <p className="text-gray-600 text-sm">{method.benefits}</p>
              </div>
              <div>
                <span className="font-semibold text-sm text-gray-800 block mb-1">Limitations</span>
                <p className="text-gray-600 text-sm">{method.limitations}</p>
              </div>
            </div>
          </div>
        );
      case 'cropyield':
        return (
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-blue-100 px-5 py-4 border-b border-blue-200">
              <h3 className="font-bold text-xl text-gray-900">{method.title}</h3>
            </div>
            <div className="p-5">
              <div className="bg-gray-50 p-4 rounded mb-5">
                <span className="font-semibold text-gray-800 block mb-1">Method</span>
                <p className="text-gray-600">{method.method}</p>
              </div>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <span className="font-semibold text-gray-800 block mb-1">Benefits</span>
                  <p className="text-gray-600">{method.benefits}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded">
                  <span className="font-semibold text-gray-800 block mb-1">Implementation</span>
                  <p className="text-gray-600">{method.implementation}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-800 block mb-1">Best For</span>
                  <p className="text-gray-600">{method.crops}</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Toggle dropdown for filter on mobile
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <Head>
        <title>Organic Farming Methods | Natural Crop Enhancement</title>
        <meta name="description" content="Learn about organic farming methods, natural manures, fertilizers, and techniques to boost crop yield without synthetic chemicals." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-lime-50">
       

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-lime-700 to-lime-600 text-white py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-pattern"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="md:flex md:justify-between md:items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-sm">Organic Farming <br/> Methods</h1>
                <p className="text-xl max-w-lg">
                  Natural approaches to enhance soil fertility, boost crop yields, and maintain ecological balance.
                </p>
              </div>
              
              {/* Search Bar */}
              <div className="md:w-2/5">
                <div className="bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-sm">
                  <h2 className="text-lg font-medium mb-3">Find Specific Methods</h2>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-white" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border border-transparent bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                      placeholder="Search methods, materials, crops..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <X className="h-5 w-5 text-white" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Introduction */}
          {!isSearching && (
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cultivate Harmony with Nature</h2>
              <p className="text-gray-700">
                Organic farming relies on natural processes and materials to provide crops with the nutrients they need while building soil health for long-term sustainability. The methods below offer time-tested approaches to maximize yield while minimizing environmental impact.
              </p>
            </div>
          )}

          {/* Search Results */}
          {isSearching && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Results{searchResults.length > 0 ? ` (${searchResults.length})` : ''}
                </h2>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearching(false);
                  }}
                  className="text-lime-600 hover:text-lime-800 flex items-center gap-1 font-medium"
                >
                  <X className="h-4 w-4" />
                  <span>Clear search</span>
                </button>
              </div>
              
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((method, index) => (
                    <div key={index}>
                      {renderMethodCard(method)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-lg mb-4">No results found for "{searchQuery}"</p>
                  <p className="text-gray-500">Try using different keywords or browse our categories below</p>
                </div>
              )}
            </div>
          )}

          {/* Tab Navigation - Desktop */}
          {!isSearching && (
            <>
              <div className="hidden md:block border-b border-gray-200 mb-8">
                <nav className="flex -mb-px justify-center">
                  <button
                    onClick={() => setActiveTab('composting')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-lg transition-all duration-200 ${
                      activeTab === 'composting'
                        ? 'border-lime-600 text-lime-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Composting Methods
                  </button>
                  <button
                    onClick={() => setActiveTab('manures')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-lg transition-all duration-200 ${
                      activeTab === 'manures'
                        ? 'border-lime-600 text-lime-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Animal Manures
                  </button>
                  <button
                    onClick={() => setActiveTab('naturalFertilizers')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-lg transition-all duration-200 ${
                      activeTab === 'naturalFertilizers'
                        ? 'border-lime-600 text-lime-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Natural Fertilizers
                  </button>
                  <button
                    onClick={() => setActiveTab('cropyield')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-lg transition-all duration-200 ${
                      activeTab === 'cropyield'
                        ? 'border-lime-600 text-lime-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Yield Boosting Methods
                  </button>
                </nav>
              </div>

              {/* Tab Navigation - Mobile dropdown */}
              <div className="md:hidden mb-6">
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-2 text-lg font-medium text-gray-700"
                  >
                    {activeTab === 'composting' && 'Composting Methods'}
                    {activeTab === 'manures' && 'Animal Manures'}
                    {activeTab === 'naturalFertilizers' && 'Natural Fertilizers'}
                    {activeTab === 'cropyield' && 'Yield Boosting Methods'}
                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  
                  {dropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                      <button
                        onClick={() => {setActiveTab('composting'); setDropdownOpen(false);}}
                        className={`w-full text-left px-4 py-2 ${activeTab === 'composting' ? 'bg-lime-50 text-lime-600' : 'hover:bg-gray-50'}`}
                      >
                        Composting Methods
                      </button>
                      <button
                        onClick={() => {setActiveTab('manures'); setDropdownOpen(false);}}
                        className={`w-full text-left px-4 py-2 ${activeTab === 'manures' ? 'bg-lime-50 text-lime-600' : 'hover:bg-gray-50'}`}
                      >
                        Animal Manures
                      </button>
                      <button
                        onClick={() => {setActiveTab('naturalFertilizers'); setDropdownOpen(false);}}
                        className={`w-full text-left px-4 py-2 ${activeTab === 'naturalFertilizers' ? 'bg-lime-50 text-lime-600' : 'hover:bg-gray-50'}`}
                      >
                        Natural Fertilizers
                      </button>
                      <button
                        onClick={() => {setActiveTab('cropyield'); setDropdownOpen(false);}}
                        className={`w-full text-left px-4 py-2 ${activeTab === 'cropyield' ? 'bg-lime-50 text-lime-600' : 'hover:bg-gray-50'}`}
                      >
                        Yield Boosting Methods
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Composting Section */}
              {activeTab === 'composting' && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Composting Methods</h2>
                    <p className="text-gray-600 mt-2">Transform waste into black gold for your garden with these composting techniques
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {organicMethods.composting.map((method, index) => (
                    <div key={index}>
                      {renderMethodCard(method)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Manures Section */}
            {activeTab === 'manures' && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Animal Manures</h2>
                  <p className="text-gray-600 mt-2">Nature's balanced fertilizers provide essential nutrients and improve soil structure</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {organicMethods.manures.map((method, index) => (
                    <div key={index}>
                      {renderMethodCard(method)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Natural Fertilizers Section */}
            {activeTab === 'naturalFertilizers' && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Natural Fertilizers</h2>
                  <p className="text-gray-600 mt-2">Boost plant growth with these sustainable alternatives to synthetic fertilizers</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {organicMethods.naturalFertilizers.map((method, index) => (
                    <div key={index}>
                      {renderMethodCard(method)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Crop Yield Methods Section */}
            {activeTab === 'cropyield' && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Yield Boosting Methods</h2>
                  <p className="text-gray-600 mt-2">Maximize your garden's productivity with these proven organic techniques</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {organicMethods.cropyield.map((method, index) => (
                    <div key={index}>
                      {renderMethodCard(method)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        </div>

        {/* Call to Action Section */}
        <div className="bg-lime-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-3/5">
                <h2 className="text-3xl font-bold mb-4">Ready to grow organically?</h2>
                <p className="text-lg mb-6 text-lime-100">
                  Start building healthier soil and growing nutrient-rich crops without synthetic chemicals. 
                  Join our community of organic growers for seasonal tips and resources.
                </p>
                <div className="flex gap-4">
                  <button className="bg-white text-lime-700 px-6 py-3 rounded-lg font-semibold hover:bg-lime-50 transition-colors duration-200">
                    Join Community
                  </button>
                  <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-lime-600 transition-colors duration-200">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="hidden md:block md:w-2/5">
                {/* This is where an illustration or image could go */}
                <div className="h-64 bg-lime-600 rounded-lg flex items-center justify-center">
                  <Leaf className="h-16 w-16 text-lime-100" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Leaf className="h-6 w-6 text-lime-500 mr-2" />
                  <span className="font-bold text-xl">EcoGrow</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Empowering farmers and gardeners with sustainable, organic methods for a healthier planet.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Facebook</span>
                    {/* Facebook icon would go here */}
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Instagram</span>
                    {/* Instagram icon would go here */}
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Twitter</span>
                    {/* Twitter icon would go here */}
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Growing Guides</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Crop Calendar</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Pest Management</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Seed Library</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Community</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Forum</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Events</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Workshops</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Newsletter</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">About</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Our Mission</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">The Team</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Partnerships</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} EcoGrow. All rights reserved.</p>
              <div className="mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm mr-4">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm mr-4">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}