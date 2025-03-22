import os
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)

# Get absolute path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "plant_disease_cnn.h5")

# Check if the model file exists
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

# Load trained CNN model
model = tf.keras.models.load_model(MODEL_PATH)

# Load label encoder
with open(os.path.join(BASE_DIR, "label_encoder.pkl"), "rb") as f:
    label_encoder = pickle.load(f)

@app.route('/output', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    file_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    if img is None:
        return jsonify({"error": "Invalid image"}), 400

    # Preprocess image
    img = cv2.resize(img, (128, 128))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    # Predict disease
    prediction = model.predict(img)
    predicted_class = np.argmax(prediction)
    confidence = round(np.max(prediction) * 100, 2)  # Convert to percentage
    disease_name = label_encoder.inverse_transform([predicted_class])[0]

    return jsonify({"prediction": disease_name, "confidence": float(confidence)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
