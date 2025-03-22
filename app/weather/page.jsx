"use client";
import { useState, useEffect } from "react";
import SplitText from "./SplitText";
import { Cloud, Droplets, Search, Leaf, MapPin, ThermometerSun } from "lucide-react";

const WEATHER_API_KEY = "807765d15c69517044493b5b520cfec4";
const BACKEND_URL = "http://127.0.0.1:5000";

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [crops, setCrops] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bgClass, setBgClass] = useState("from-green-800 to-blue-800");

  // Change background based on time of day and weather
  useEffect(() => {
    if (weather) {
      const condition = weather.condition.toLowerCase();
      if (condition.includes("rain") || condition.includes("drizzle")) {
        setBgClass("from-slate-700 to-blue-900");
      } else if (condition.includes("cloud")) {
        setBgClass("from-blue-700 to-slate-600");
      } else if (condition.includes("clear")) {
        setBgClass("from-blue-500 to-indigo-800");
      } else if (condition.includes("snow")) {
        setBgClass("from-slate-300 to-blue-600");
      } else {
        setBgClass("from-green-800 to-blue-800");
      }
    }
  }, [weather]);

  async function fetchWeather() {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
      );
      
      if (!res.ok) throw new Error("City not found. Please check the spelling and try again.");
      
      const json = await res.json();
      const temp = json.main.temp;
      const humidity = json.main.humidity;
      
      setWeather({
        name: json.name,
        country: json.sys.country,
        temp: Math.round(temp),
        humidity: humidity,
        condition: json.weather[0].description,
        icon: json.weather[0].icon,
        wind: json.wind.speed,
        feelsLike: Math.round(json.main.feels_like),
      });
      
      fetchRecommendedCrops(temp, humidity);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setCrops([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchRecommendedCrops(temp, humidity) {
    try {
      const res = await fetch(`${BACKEND_URL}/recommend_crops?temperature=${temp}&humidity=${humidity}`);
      const data = await res.json();
      
      if (data.recommended_crops.length > 0) {
        setCrops(data.recommended_crops);
      } else {
        setCrops(["No suitable crops found for these conditions"]);
      }
    } catch (err) {
      setCrops(["Unable to fetch crop recommendations. Please try again later."]);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className={`bg-gradient-to-b ${bgClass} min-h-screen flex flex-col items-center pt-6 pb-12 px-4 transition-colors duration-700`}>
      {/* Header with animated title */}
      <div className="w-full max-w-3xl text-center mb-8">
        <SplitText
          text="Weather Forecasts & Crop Recommendation."
          className="text-4xl md:text-5xl font-bold text-white mb-2"
          delay={80}
          animationFrom={{ opacity: 0, transform: "translate3d(0,30px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-20px"
        />
        <p className="text-gray-200 text-4xl md:text-4xl font-large">Weather Forecasts & Crop Recommendations</p>
      </div>

      {/* Search box */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg mb-6">
        <div className="relative flex items-center">
          <MapPin className="absolute left-3 text-gray-200" size={18} />
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 w-full p-3 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-300"
          />
          <button 
            onClick={fetchWeather}
            disabled={isLoading} 
            className="absolute right-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-70 transition-colors"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Search size={20} />
            )}
          </button>
        </div>
        {error && <p className="text-red-300 mt-2 text-sm">{error}</p>}
      </div>

      {/* Weather display */}
      {weather && (
        <div className="w-full max-w-2xl">
          {/* Main weather card */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{weather.name}, {weather.country}</h2>
                  <p className="text-gray-200">{weather.condition}</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold">{weather.temp}°C</div>
                  <p className="text-gray-200">Feels like: {weather.feelsLike}°C</p>
                </div>
              </div>
              
              <div className="flex mt-6 gap-4">
                <div className="flex-1 bg-white/5 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Droplets className="text-blue-300" size={20} />
                    <span className="text-gray-200">Humidity</span>
                  </div>
                  <p className="text-xl font-semibold mt-1">{weather.humidity}%</p>
                </div>
                <div className="flex-1 bg-white/5 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Cloud className="text-gray-300" size={20} />
                    <span className="text-gray-200">Wind</span>
                  </div>
                  <p className="text-xl font-semibold mt-1">{weather.wind} m/s</p>
                </div>
              </div>
            </div>
          </div>

          {/* Crop recommendations */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Leaf className="text-green-300 mr-2" size={24} />
                <h3 className="text-xl font-bold text-white">Recommended Crops</h3>
              </div>
              
              {crops.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {crops.map((crop, index) => (
                    <div 
                      key={index} 
                      className="bg-white/5 p-3 rounded-lg text-white flex items-center"
                    >
                      <ThermometerSun size={16} className="text-yellow-300 mr-2" />
                      <span>{crop}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-300 text-center py-4">
                  Loading crop recommendations...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="mt-auto pt-8 text-gray-300 text-sm text-center">
        <p>Data provided by OpenWeatherMap API</p>
      </div>
    </div>
  );
}