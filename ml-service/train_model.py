import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

# Load dataset
df = pd.read_csv("creditcard.csv")

# Features & labels
X = df.drop("Class", axis=1)
y = df["Class"]

# Split data (IMPORTANT: stratify for imbalance)
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    stratify=y,
    random_state=42
)

# Train model
model = RandomForestClassifier(
    n_estimators=100,
    class_weight="balanced",
    random_state=42
)

model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
print("\nModel Performance:\n")
print(classification_report(y_test, y_pred))

# Save model
joblib.dump(model, "fraud_model.pkl")

print("\nModel trained and saved!")