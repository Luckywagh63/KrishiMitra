from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app, resources={r"/api/chatbot": {"origins": "*"}}, supports_credentials=True)

# Load API key securely
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set in the environment variables.")

genai.configure(api_key=GEMINI_API_KEY)

@app.route("/api/chatbot", methods=["OPTIONS", "POST"])
def chatbot():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight successful"}), 200

    try:
        data = request.json
        user_message = data.get("message", "").strip()
        conversation_history = data.get("conversation_history", [])

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Prepare messages correctly for Gemini
        messages = [{"role": "user", "parts": [{"text": user_message}]}]

        # Call Gemini API
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(messages)

        bot_reply = response.text if hasattr(response, "text") else "Sorry, I couldn't process your request."

        return jsonify({"reply": bot_reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
