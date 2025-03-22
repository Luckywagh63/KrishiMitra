from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend requests

# Load crop dataset
try:
    crop_data = pd.read_csv("Crop_data.csv")  # Ensure the file is in the same directory
except FileNotFoundError:
    print("Error: Crop_data.csv not found. Place it in the same directory as app1.py.")
    crop_data = None

@app.route('/recommend_crops', methods=['GET'])
def recommend_crops():
    """Recommends crops based on temperature and humidity."""
    if crop_data is None:
        return jsonify({"error": "Crop dataset not loaded"}), 500  # Server error

    temperature = request.args.get('temperature', type=float)
    humidity = request.args.get('humidity', type=float)

    if temperature is None or humidity is None:
        return jsonify({"error": "Missing temperature or humidity"}), 400  # Bad request

    # Find suitable crops within tolerance range
    suitable_crops = crop_data[
        (crop_data["Temperature"] >= temperature - 2) & (crop_data["Temperature"] <= temperature + 2) &
        (crop_data["Humidity"] >= humidity - 5) & (crop_data["Humidity"] <= humidity + 5)
    ]["Crop"].unique().tolist()  # Remove duplicates

    return jsonify({"recommended_crops": suitable_crops})

@app.route('/predict', methods=['POST'])
def predict():
    """Handles a /predict request (placeholder)."""
    return jsonify({"message": "This endpoint is not yet implemented."}), 200

if __name__ == '__main__':
    app.run(debug=True)
