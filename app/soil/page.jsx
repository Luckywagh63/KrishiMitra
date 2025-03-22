"use client"
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  // State for form inputs
  const [soilParams, setSoilParams] = useState({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    ph: 7,
    ec: 0,
    oc: 0,
    sulfur: 0,
    zinc: 0,
    iron: 0,
    copper: 0,
    manganese: 0,
    boron: 0
  });

  // State for recommendations
  const [recommendations, setRecommendations] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSoilParams({
      ...soilParams,
      [name]: parseFloat(value)
    });
  };

  // Analyze soil fertility and recommend crops
  const analyzeSoil = () => {
    // Soil fertility classification
    const soilAnalysis = {
      nitrogen: classifyNutrient(soilParams.nitrogen, 'nitrogen'),
      phosphorus: classifyNutrient(soilParams.phosphorus, 'phosphorus'),
      potassium: classifyNutrient(soilParams.potassium, 'potassium'),
      ph: classifyPH(soilParams.ph),
      ec: classifyEC(soilParams.ec),
      oc: classifyOC(soilParams.oc),
      sulfur: classifyNutrient(soilParams.sulfur, 'sulfur'),
      zinc: classifyNutrient(soilParams.zinc, 'zinc'),
      iron: classifyNutrient(soilParams.iron, 'iron'),
      copper: classifyNutrient(soilParams.copper, 'copper'),
      manganese: classifyNutrient(soilParams.manganese, 'manganese'),
      boron: classifyNutrient(soilParams.boron, 'boron')
    };
    
    setAnalysisResults(soilAnalysis);
    
    // Get suitable crops based on soil analysis
    const suitableCrops = recommendCrops(soilAnalysis);
    setRecommendations(suitableCrops);
  };

  // Classify nutrient levels
  const classifyNutrient = (value, nutrient) => {
    const ranges = {
      nitrogen: { low: 280, medium: 560, high: Infinity },
      phosphorus: { low: 10, medium: 25, high: Infinity },
      potassium: { low: 140, medium: 280, high: Infinity },
      sulfur: { low: 10, medium: 20, high: Infinity },
      zinc: { low: 0.5, medium: 1.0, high: Infinity },
      iron: { low: 2.5, medium: 5.0, high: Infinity },
      copper: { low: 0.2, medium: 0.4, high: Infinity },
      manganese: { low: 1.0, medium: 2.0, high: Infinity },
      boron: { low: 0.5, medium: 1.0, high: Infinity }
    };

    if (value < ranges[nutrient].low) return 'low';
    if (value < ranges[nutrient].medium) return 'medium';
    return 'high';
  };

  // Classify pH
  const classifyPH = (value) => {
    if (value < 6.0) return 'acidic';
    if (value < 7.5) return 'neutral';
    return 'alkaline';
  };

  // Classify EC (Electrical Conductivity)
  const classifyEC = (value) => {
    if (value < 0.8) return 'low';
    if (value < 1.6) return 'medium';
    return 'high';
  };

  // Classify OC (Organic Carbon)
  const classifyOC = (value) => {
    if (value < 0.5) return 'low';
    if (value < 0.75) return 'medium';
    return 'high';
  };

  // Recommend crops based on soil analysis
  const recommendCrops = (analysis) => {
    const cropDatabase = [
      {
        name: 'Rice',
        requirements: {
          nitrogen: ['medium', 'high'],
          phosphorus: ['medium', 'high'],
          potassium: ['medium', 'high'],
          ph: ['acidic', 'neutral'],
          ec: ['low', 'medium'],
        }
      },
      {
        name: 'Wheat',
        requirements: {
          nitrogen: ['medium', 'high'],
          phosphorus: ['medium', 'high'],
          potassium: ['medium'],
          ph: ['neutral'],
          ec: ['low', 'medium'],
        }
      },
      {
        name: 'Maize (Corn)',
        requirements: {
          nitrogen: ['high'],
          phosphorus: ['medium', 'high'],
          potassium: ['medium', 'high'],
          ph: ['neutral'],
          ec: ['low', 'medium'],
        }
      },
      {
        name: 'Cotton',
        requirements: {
          nitrogen: ['medium', 'high'],
          phosphorus: ['medium'],
          potassium: ['medium', 'high'],
          ph: ['neutral', 'alkaline'],
          ec: ['medium'],
        }
      },
      {
        name: 'Sugarcane',
        requirements: {
          nitrogen: ['high'],
          phosphorus: ['medium', 'high'],
          potassium: ['high'],
          ph: ['neutral'],
          ec: ['medium'],
        }
      },
      {
        name: 'Potato',
        requirements: {
          nitrogen: ['medium'],
          phosphorus: ['high'],
          potassium: ['high'],
          ph: ['acidic', 'neutral'],
          ec: ['low', 'medium'],
        }
      },
      {
        name: 'Tomato',
        requirements: {
          nitrogen: ['medium'],
          phosphorus: ['medium', 'high'],
          potassium: ['medium', 'high'],
          ph: ['neutral'],
          ec: ['medium'],
        }
      },
      {
        name: 'Peanut',
        requirements: {
          nitrogen: ['low', 'medium'],
          phosphorus: ['medium'],
          potassium: ['medium'],
          ph: ['neutral'],
          ec: ['low', 'medium'],
        }
      },
      {
        name: 'Soybean',
        requirements: {
          nitrogen: ['low', 'medium'],
          phosphorus: ['medium', 'high'],
          potassium: ['medium', 'high'],
          ph: ['neutral'],
          ec: ['low', 'medium'],
        }
      },
      {
        name: 'Sunflower',
        requirements: {
          nitrogen: ['medium'],
          phosphorus: ['medium'],
          potassium: ['medium', 'high'],
          ph: ['neutral'],
          ec: ['medium'],
        }
      },
      {
        name: 'Onion',
        requirements: {
          nitrogen: ['medium'],
          phosphorus: ['medium', 'high'],
          potassium: ['medium'],
          ph: ['neutral'],
          sulfur: ['medium', 'high'],
          zinc: ['medium'],
          ec: ['low', 'medium'],
        }
      },
      {
        name: 'Garlic',
        requirements: {
          nitrogen: ['medium'],
          phosphorus: ['medium'],
          potassium: ['medium'],
          ph: ['neutral'],
          sulfur: ['medium', 'high'],
          ec: ['low', 'medium'],
        }
      },
      {
        name: 'Cabbage',
        requirements: {
          nitrogen: ['medium', 'high'],
          phosphorus: ['medium'],
          potassium: ['medium'],
          ph: ['neutral'],
          boron: ['medium'],
          ec: ['low', 'medium'],
        }
      },
      {
        name: 'Carrot',
        requirements: {
          nitrogen: ['medium'],
          phosphorus: ['medium'],
          potassium: ['medium', 'high'],
          ph: ['neutral'],
          ec: ['low'],
        }
      },
      {
        name: 'Cucumber',
        requirements: {
          nitrogen: ['medium'],
          phosphorus: ['medium'],
          potassium: ['medium', 'high'],
          ph: ['neutral'],
          ec: ['low', 'medium'],
        }
      }
    ];

    // Filter crops that match soil conditions
    return cropDatabase.filter(crop => {
      // Check if soil conditions meet crop requirements
      for (const [nutrient, requiredLevels] of Object.entries(crop.requirements)) {
        if (!requiredLevels.includes(analysis[nutrient])) {
          return false;
        }
      }
      return true;
    });
  };

  return (
    <div>
      <Head>
        <title>Soil Fertility Analyzer</title>
        <meta name="description" content="Analyze soil fertility and get crop recommendations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Soil Fertility Analyzer</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Soil Parameters</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nitrogen (N) (kg/ha)</label>
                <input
                  type="number"
                  name="nitrogen"
                  value={soilParams.nitrogen}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Phosphorus (P) (kg/ha)</label>
                <input
                  type="number"
                  name="phosphorus"
                  value={soilParams.phosphorus}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Potassium (K) (kg/ha)</label>
                <input
                  type="number"
                  name="potassium"
                  value={soilParams.potassium}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">pH</label>
                <input
                  type="number"
                  name="ph"
                  value={soilParams.ph}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  min="0"
                  max="14"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">EC (dS/m)</label>
                <input
                  type="number"
                  name="ec"
                  value={soilParams.ec}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  min="0"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Organic Carbon (OC) (%)</label>
                <input
                  type="number"
                  name="oc"
                  value={soilParams.oc}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Sulfur (S) (ppm)</label>
                <input
                  type="number"
                  name="sulfur"
                  value={soilParams.sulfur}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  min="0"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Zinc (Zn) (ppm)</label>
                <input
                  type="number"
                  name="zinc"
                  value={soilParams.zinc}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Iron (Fe) (ppm)</label>
                <input
                  type="number"
                  name="iron"
                  value={soilParams.iron}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  min="0"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Copper (Cu) (ppm)</label>
                <input
                  type="number"
                  name="copper"
                  value={soilParams.copper}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Manganese (Mn) (ppm)</label>
                <input
                  type="number"
                  name="manganese"
                  value={soilParams.manganese}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  min="0"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Boron (B) (ppm)</label>
                <input
                  type="number"
                  name="boron"
                  value={soilParams.boron}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            
            <button 
              onClick={analyzeSoil}
              className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded mt-6 hover:bg-green-700 transition duration-200"
            >
              Analyze Soil & Recommend Crops
            </button>
          </div>
          
          {/* Results Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Soil Analysis Results</h2>
            
            {analysisResults ? (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Nutrient Status:</h3>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex justify-between">
                    <span>Nitrogen:</span>
                    <span className={`font-medium ${getStatusColor(analysisResults.nitrogen)}`}>
                      {analysisResults.nitrogen.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phosphorus:</span>
                    <span className={`font-medium ${getStatusColor(analysisResults.phosphorus)}`}>
                      {analysisResults.phosphorus.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Potassium:</span>
                    <span className={`font-medium ${getStatusColor(analysisResults.potassium)}`}>
                      {analysisResults.potassium.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>pH:</span>
                    <span className={`font-medium ${
                      analysisResults.ph === 'neutral' ? 'text-green-600' : 
                      (analysisResults.ph === 'acidic' ? 'text-red-600' : 'text-blue-600')
                    }`}>
                      {analysisResults.ph.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>EC:</span>
                    <span className={`font-medium ${getStatusColor(analysisResults.ec)}`}>
                      {analysisResults.ec.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Organic Carbon:</span>
                    <span className={`font-medium ${getStatusColor(analysisResults.oc)}`}>
                      {analysisResults.oc.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sulfur:</span>
                    <span className={`font-medium ${getStatusColor(analysisResults.sulfur)}`}>
                      {analysisResults.sulfur.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zinc:</span>
                    <span className={`font-medium ${getStatusColor(analysisResults.zinc)}`}>
                      {analysisResults.zinc.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Iron:</span>
                    <span className={`font-medium ${getStatusColor(analysisResults.iron)}`}>
                      {analysisResults.iron.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Copper:</span>
                    <span className={`font-medium ${getStatusColor(analysisResults.copper)}`}>
                      {analysisResults.copper.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Manganese:</span>
                    <span className={`font-medium ${getStatusColor(analysisResults.manganese)}`}>
                      {analysisResults.manganese.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Boron:</span>
                    <span className={`font-medium ${getStatusColor(analysisResults.boron)}`}>
                      {analysisResults.boron.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">Enter soil parameters and click "Analyze" to see results</p>
            )}
            
            <h2 className="text-xl font-semibold mb-4">Recommended Crops</h2>
            
            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {recommendations.map((crop, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 rounded p-3">
                    <h3 className="text-lg font-medium text-green-800">{crop.name}</h3>
                  </div>
                ))}
              </div>
            ) : analysisResults ? (
              <p className="text-orange-600">
                No suitable crops found for the given soil parameters. Consider soil amendments to improve fertility.
              </p>
            ) : (
              <p className="text-gray-500 italic">Crop recommendations will appear here after analysis</p>
            )}
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-gray-600 text-sm">
        <p>Soil Fertility Analyzer - Results are advisory only. Professional soil testing is recommended.</p>
      </footer>
    </div>
  );
}

// Helper function to get color class based on status
function getStatusColor(status) {
  switch (status) {
    case 'low':
      return 'text-red-600';
    case 'medium':
      return 'text-yellow-600';
    case 'high':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
}