"use client";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";

const BarcodeScanner = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [manualBarcode, setManualBarcode] = useState(""); // State for manual barcode input

  useEffect(() => {
    let qrCodeScanner;

    if (isScanning) {
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices.length > 0) {
            const cameraId = devices[0].id;
            qrCodeScanner = new Html5Qrcode("reader");

            qrCodeScanner
              .start(
                cameraId,
                { fps: 10, qrbox: { width: 250, height: 250 } },
                (decodedText) => {
                  console.log("Scanned barcode:", decodedText);
                  setIsLoading(true);
                  fetchProductDetails(decodedText);
                  setIsScanning(false);
                },
                (scanError) => {
                  console.warn("QR Scan Error:", scanError);
                }
              )
              .catch((err) => {
                console.error("Camera initialization error:", err);
                setError("Failed to access the camera. Please check permissions.");
                setIsScanning(false);
              });
          } else {
            setError("No camera found on this device.");
          }
        })
        .catch((err) => {
          console.error("Camera error:", err);
          setError("Error accessing camera devices.");
        });
    }

    return () => {
      if (qrCodeScanner) {
        qrCodeScanner.stop().catch((clearError) =>
          console.warn("QR scanner stop error:", clearError)
        );
      }
    };
  }, [isScanning]);

  const fetchProductDetails = async (barcode) => {
    setError(null);
    const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 1) {
        setProductDetails(data.product);
      } else {
        setError("Product not found in Open Food Facts database");
        setProductDetails(null);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to fetch product details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startScanning = () => {
    setProductDetails(null);
    setError(null);
    setIsScanning(true);
  };

  const handleManualSubmit = () => {
    if (manualBarcode.trim() === "") {
      setError("Please enter a barcode number.");
      return;
    }
    setIsLoading(true);
    fetchProductDetails(manualBarcode);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
        Product Scanner
      </h2>

      {!isScanning ? (
        <div className="flex flex-col items-center">
          <button
            onClick={startScanning}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9 1a1 1 0 10-2 0v6a1 1 0 102 0V6zm-4 1a1 1 0 10-2 0v4a1 1 0 102 0V7z"
                clipRule="evenodd"
              />
            </svg>
            Scan Barcode
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <div
            id="reader"
            className="overflow-hidden rounded-lg border-2 border-indigo-300 h-64 w-full"
          ></div>
          <p className="text-center mt-2 text-sm text-gray-600">
            Position the barcode within the frame to scan
          </p>
        </div>
      )}

      {/* Manual Barcode Entry */}
      <div className="mt-4 flex flex-col items-center">
        <input
          type="text"
          value={manualBarcode}
          onChange={(e) => setManualBarcode(e.target.value)}
          placeholder="Enter barcode manually"
          className="border border-gray-300 rounded px-4 py-2 w-full text-center text-black"
        />
        <button
          onClick={handleManualSubmit}
          className="mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Submit
        </button>
      </div>

      {isLoading && (
        <div className="text-center py-4">
          <div className="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Looking up product...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {productDetails && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Product Details
          </h3>
          <div className="flex flex-col md:flex-row">
            {productDetails.image_url && (
              <div className="md:w-1/3 mb-4 md:mb-0 flex items-center justify-center">
                <img
                  src={productDetails.image_url}
                  alt={productDetails.product_name || "Product"}
                  className="h-32 object-contain rounded shadow-sm"
                />
              </div>
            )}
            <div className="md:w-2/3 md:pl-4">
              <div className="mb-2">
                <p className="text-lg font-medium text-gray-900">
                  {productDetails.product_name || "Unknown Product"}
                </p>
                <p className="text-gray-600">
                  {productDetails.brands || "No Brand"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="bg-white p-2 rounded border border-gray-200">
                  <p className="text-xs text-gray-500">Categories</p>
                  <p className="text-sm text-black">
                    {productDetails.categories || "Not Available"}
                  </p>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <p className="text-xs text-gray-500">Ingredients</p>
                  <p className="text-sm text-black">
                    {productDetails.ingredients_text || "Not Provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
