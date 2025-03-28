import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier  # Example model

# Load your dataset
df = pd.read_csv("soil_data.csv")

# Define features and target
X = df.drop(columns=["Suitable_Crop"])  # Features (N, P, K, pH, etc.)
y = df["Suitable_Crop"]  # Target variable

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save trained model
joblib.dump(model, "soil_model.pkl")
print("Model saved successfully!")
