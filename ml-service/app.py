from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load trained model
model = joblib.load("fraud_model.pkl")


# ✅ Health check route
@app.route("/")
def home():
    return "ML Fraud Detection API Running 🚀"


# ✅ Prediction route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # ✅ Ensure correct feature order (VERY IMPORTANT)
        features = np.array([[
            data.get("time", 0),

            data.get("f1", 0),
            data.get("f2", 0),
            data.get("f3", 0),
            data.get("f4", 0),
            data.get("f5", 0),
            data.get("f6", 0),
            data.get("f7", 0),
            data.get("f8", 0),
            data.get("f9", 0),
            data.get("f10", 0),
            data.get("f11", 0),
            data.get("f12", 0),
            data.get("f13", 0),
            data.get("f14", 0),
            data.get("f15", 0),
            data.get("f16", 0),
            data.get("f17", 0),
            data.get("f18", 0),
            data.get("f19", 0),
            data.get("f20", 0),
            data.get("f21", 0),
            data.get("f22", 0),
            data.get("f23", 0),
            data.get("f24", 0),
            data.get("f25", 0),
            data.get("f26", 0),
            data.get("f27", 0),
            data.get("f28", 0),

            data.get("amount", 0)
        ]])

        # Predict fraud probability
        fraud_score = model.predict_proba(features)[0][1]

        return jsonify({
            "fraudScore": float(fraud_score)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(port=5001)