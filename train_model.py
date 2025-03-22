import os
import numpy as np
import cv2
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.models import Sequential
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import pickle

# Set dataset path
dataset_path = "./Train/Train"  # Adjust this to your dataset location

# Function to load images and labels
def load_images_from_folder(folder):
    X, y = [], []
    categories = os.listdir(folder)

    for category in categories:
        category_path = os.path.join(folder, category)
        if not os.path.isdir(category_path):
            continue

        for img_name in os.listdir(category_path):
            img_path = os.path.join(category_path, img_name)
            img = cv2.imread(img_path)
            if img is None:
                continue

            img = cv2.resize(img, (128, 128))  # Increase size for CNN
            img = img / 255.0  # Normalize

            X.append(img)
            y.append(category)

    return np.array(X), np.array(y)

# Load dataset
X, y = load_images_from_folder(dataset_path)

# Convert labels to numeric values
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# **Build CNN Model**
model = Sequential([
    Conv2D(32, (3,3), activation="relu", input_shape=(128, 128, 3)),
    MaxPooling2D((2,2)),
    
    Conv2D(64, (3,3), activation="relu"),
    MaxPooling2D((2,2)),

    Conv2D(128, (3,3), activation="relu"),
    MaxPooling2D((2,2)),

    Flatten(),
    Dense(128, activation="relu"),
    Dropout(0.5),  # Prevent overfitting
    Dense(len(set(y)), activation="softmax")  # Multi-class classification
])

# Compile Model
model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])

# Train Model
model.fit(X_train, y_train, epochs=15, batch_size=32, validation_data=(X_test, y_test))

# Save model and label encoder
model.save("plant_disease_cnn.h5")

with open("label_encoder.pkl", "wb") as f:
    pickle.dump(label_encoder, f)

print("Model trained and saved as plant_disease_cnn.h5")
