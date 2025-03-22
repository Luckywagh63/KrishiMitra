from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load trained soil fertility model
with open('random_forest_pkl.pkl', 'rb') as f:  # Ensure your model file is correct
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  # Get input data
        features = np.array([[data[key] for key in ['N', 'P', 'K', 'pH', 'EC', 'OC', 'S', 'Zn', 'Fe', 'Cu', 'Mn', 'B']]])
        prediction = model.predict(features)[0]  # Predict fertility level

        return jsonify({"fertility": prediction})  # Return the result
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)  # Runs on http://127.0.0.1:5000
