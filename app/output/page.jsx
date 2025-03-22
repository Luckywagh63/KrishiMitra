"use client";
import { useSearchParams } from "next/navigation";

export default function OutputPage() {
  const searchParams = useSearchParams();
  const prediction = searchParams.get("prediction");
  const confidence = searchParams.get("confidence");
  const imageUrl = searchParams.get("image");

  // Disease Data (Symptoms, Treatment, Prevention, etc.)
  const diseaseData = {
    "Leaf Rust": {
      symptoms: "Yellow-orange spots on leaves, premature leaf drop.",
      treatment: "Apply fungicides like Propiconazole or Tebuconazole.",
      pesticide: "Use Mancozeb or Chlorothalonil-based pesticides.",
      prevention: "Ensure proper spacing, remove infected leaves, and use rust-resistant crop varieties.",
      riskLevel: "High",
      alternativeCrops: "Rust-resistant wheat varieties such as 'Jagger' or 'TAM 111'."
    },
    "Powdery": {
      symptoms: "White powdery patches on leaves and stems.",
      treatment: "Remove infected leaves and ensure good air circulation.",
      pesticide: "Sulfur-based fungicides or Neem oil work effectively.",
      prevention: "Avoid excessive nitrogen fertilizers and plant mildew-resistant varieties.",
      riskLevel: "Moderate",
      alternativeCrops: "Barley and oats tend to be more mildew-resistant."
    },
    "Rust": {
      symptoms: "Small reddish-brown spots on leaves, stunted plant growth.",
      treatment: "Avoid overhead watering and apply fungicides like Azoxystrobin.",
      pesticide: "Use Trifloxystrobin or Copper-based fungicides.",
      prevention: "Rotate crops and remove any plant debris after harvest.",
      riskLevel: "High",
      alternativeCrops: "Switch to resistant crop varieties such as 'AAC Tenacious'."
    },
    "Healthy": {
      symptoms: "No disease detected! Your plant looks healthy.",
      treatment: "No treatment needed! Keep monitoring for early signs of disease.",
      pesticide: "Regular neem oil spray can prevent future infections.",
      prevention: "Continue regular monitoring and follow organic farming practices.",
      riskLevel: "Low",
      alternativeCrops: "Keep growing your current crop. No change needed!"
    }
  };

  // Get disease info or default to "No data available"
  const diseaseInfo = diseaseData[prediction] || {
    symptoms: "No information available.",
    treatment: "No specific treatment found.",
    pesticide: "No recommended pesticides.",
    prevention: "No prevention methods available.",
    riskLevel: "Unknown",
    alternativeCrops: "No recommendations."
  };

  // Risk Level Indicator Styling
  const riskColors = {
    "High": "text-red-700 bg-red-100 border-red-300",
    "Moderate": "text-yellow-700 bg-yellow-100 border-yellow-300",
    "Low": "text-green-700 bg-green-100 border-green-300",
    "Unknown": "text-gray-700 bg-gray-100 border-gray-300"
  };

  // Define icons for each section
  const icons = {
    symptoms: "👁️",
    treatment: "💊",
    pesticide: "🧪",
    prevention: "🛡️",
    risk: "⚠️",
    alternative: "🌱"
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-white min-h-screen flex items-center justify-center p-4 md:p-8">
      <section className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header with leaf pattern background */}
        <div className="bg-gradient-to-r from-green-600 to-green-400 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {/* SVG pattern background */}
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="leaf-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M25,0 C30,15 40,25 50,25 C40,30 30,40 25,50 C20,40 10,30 0,25 C10,25 20,15 25,0" fill="currentColor" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center relative z-10 flex items-center justify-center gap-3">
            <span className="text-3xl">🌿</span> Crop Disease Analysis
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Image and Prediction */}
          <div className="w-full lg:w-2/5 p-6 md:p-8">
            {imageUrl ? (
              <div className="space-y-6">
                {/* Image with frame */}
                <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-green-100">
                  <img 
                    src={decodeURIComponent(imageUrl)} 
                    alt="Uploaded Crop" 
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-sm">Uploaded Image</p>
                  </div>
                </div>

                {/* Prediction Card */}
                <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-5 shadow-md border border-green-200">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-green-800">Diagnosis Result</h2>
                    <span className="text-2xl">🔬</span>
                  </div>
                  
                  {prediction ? (
                    <>
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-2xl md:text-3xl font-bold text-green-700">{prediction}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${riskColors[diseaseInfo.riskLevel]} flex items-center gap-1`}>
                          {icons.risk} {diseaseInfo.riskLevel} Risk
                        </div>
                      </div>
                      <div className="mt-3 flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{ width: `${confidence}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700">{confidence}%</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Confidence Level</p>
                    </>
                  ) : (
                    <p className="text-gray-600">No prediction available. Please upload an image first.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl">
                <p className="text-gray-500 text-center px-6">No image uploaded. Please go back and upload a crop image for analysis.</p>
              </div>
            )}

            {/* Back Button */}
            <div className="mt-6">
              <button
                onClick={() => window.history.back()}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-base font-medium hover:bg-blue-700 transition duration-300 shadow-md flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Upload
              </button>
            </div>
          </div>

          {/* Right Side - Treatment Details */}
          <div className="w-full lg:w-3/5 bg-gray-50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
              <span className="text-xl">🌱</span> Treatment & Recommendations
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Symptoms Card */}
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl" role="img" aria-label="Symptoms">{icons.symptoms}</span>
                  <h3 className="text-lg font-semibold text-green-700">Symptoms</h3>
                </div>
                <p className="text-gray-700">{diseaseInfo.symptoms}</p>
              </div>

              {/* Treatment Card */}
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl" role="img" aria-label="Treatment">{icons.treatment}</span>
                  <h3 className="text-lg font-semibold text-green-700">Treatment</h3>
                </div>
                <p className="text-gray-700">{diseaseInfo.treatment}</p>
              </div>

              {/* Pesticide Card */}
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl" role="img" aria-label="Pesticide">{icons.pesticide}</span>
                  <h3 className="text-lg font-semibold text-green-700">Recommended Pesticide</h3>
                </div>
                <p className="text-gray-700">{diseaseInfo.pesticide}</p>
              </div>

              {/* Prevention Card */}
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl" role="img" aria-label="Prevention">{icons.prevention}</span>
                  <h3 className="text-lg font-semibold text-green-700">Prevention Tips</h3>
                </div>
                <p className="text-gray-700">{diseaseInfo.prevention}</p>
              </div>

              {/* Alternative Crops - Full Width */}
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl" role="img" aria-label="Alternative Crops">{icons.alternative}</span>
                  <h3 className="text-lg font-semibold text-green-700">Alternative Crops</h3>
                </div>
                <p className="text-gray-700">{diseaseInfo.alternativeCrops}</p>
              </div>
            </div>

            {/* Next Steps Section */}
            <div className="mt-6 bg-green-50 p-5 rounded-xl border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Next Steps</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">1.</span>
                  <span className="text-gray-700">Follow the treatment plan recommended above</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">2.</span>
                  <span className="text-gray-700">Monitor your crops regularly for changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">3.</span>
                  <span className="text-gray-700">Consider consulting with a local agricultural expert</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">4.</span>
                  <span className="text-gray-700">Upload new images for follow-up analysis as needed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 p-4 text-center text-gray-500 text-sm">
          Crop Disease Detection System • Helping farmers identify and treat crop diseases effectively
        </footer>
      </section>
    </div>
  );
}