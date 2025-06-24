import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import VGG19
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Flatten
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import cv2
import kagglehub
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.model_selection import train_test_split
import shutil

# Define class names for the DermNet dataset
class_names = [
    'Acne and Rosacea Photos',
    'Actinic Keratosis Basal Cell Carcinoma',
    'Atopic Dermatitis Photos',
    'Bullous Disease Photos',
    'Cellulitis Impetigo',
    'Eczema Photos',
    'Exanthems and Drug Eruptions',
    'Hair Loss Photos Alopecia',
    'Herpes HPV and other STDs Photos',
    'Light Diseases and Disorders of Pigmentation',
    'Lupus and other Connective Tissue diseases',
    'Melanoma Skin Cancer Nevi and Moles',
    'Nail Fungus and other Nail Disease',
    'Poison Ivy Photos and other Contact Dermatitis',
    'Psoriasis pictures Lichen Planus and related diseases',
    'Scabies Lyme Disease and other Infestations and Bites',
    'Seborrheic Keratoses and other Benign Tumors',
    'Systemic Disease',
    'Tinea Ringworm Candidiasis and other Fungal Infections',
    'Urticaria Hives',
    'Vascular Tumors',
    'Vasculitis Photos',
    'Warts Molluscum and other Viral Infections'
]

# Configuration options
IMG_SIZE = 180
BATCH_SIZE = 32
EPOCHS = 10  # Reduced from 20 to make training faster
LEARNING_RATE = 0.001
VALIDATION_SPLIT = 0.2
RANDOM_STATE = 42
MAX_IMAGES_PER_CLASS = 200  # Reduced from 1000 to avoid memory issues

def download_dataset():
    """Download the DermNet dataset from Kaggle and return the path"""
    try:
        print("Downloading DermNet dataset from Kaggle...")
        path = kagglehub.dataset_download("shubhamgoel27/dermnet")
        print(f"Dataset downloaded to: {path}")
        return path
    except Exception as e:
        print(f"Error downloading dataset: {str(e)}")
        return None

def load_images(dataset_path):
    """Load and preprocess images from the dataset path"""
    images = []
    labels = []
    class_counts = {}
    
    # Adjust the path to include the 'train' subdirectory
    train_path = os.path.join(dataset_path, "train")
    if not os.path.exists(train_path):
        print(f"Train directory not found at {train_path}")
        # List available directories at the dataset path to help debug
        print("Available directories at dataset path:")
        for item in os.listdir(dataset_path):
            item_path = os.path.join(dataset_path, item)
            if os.path.isdir(item_path):
                print(f"- {item}")
        return np.array(images), np.array(labels), class_counts
    
    # Find all available class folders in the train directory
    available_classes = [d for d in os.listdir(train_path) 
                         if os.path.isdir(os.path.join(train_path, d))]
    
    print(f"Found {len(available_classes)} class directories in train folder:")
    for class_name in available_classes:
        print(f"- {class_name}")
    
    # Map folder names to class indices
    class_to_index = {class_name: i for i, class_name in enumerate(available_classes)}
    
    print("Loading images from dataset...")
    for class_name in available_classes:
        class_path = os.path.join(train_path, class_name)
        if not os.path.exists(class_path):
            print(f"Warning: Class folder {class_name} not found")
            continue
            
        class_index = class_to_index[class_name]
        count = 0
        
        # Get list of image files and shuffle them
        image_files = [f for f in os.listdir(class_path) 
                     if f.endswith(('.jpg', '.jpeg', '.png', '.bmp'))]
        np.random.shuffle(image_files)
        
        # Limit number of images per class
        for img_file in image_files[:MAX_IMAGES_PER_CLASS]:
            try:
                img_path = os.path.join(class_path, img_file)
                img = cv2.imread(img_path)
                if img is None:
                    continue
                    
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
                images.append(img)
                labels.append(class_index)
                count += 1
            except Exception as e:
                print(f"Error processing {img_path}: {str(e)}")
        
        class_counts[class_name] = count
        print(f"Loaded {count} images for class {class_name}")
    
    return np.array(images), np.array(labels), class_counts

def train_model(dataset_path=None):
    # Download dataset if path is not provided
    if dataset_path is None:
        dataset_path = download_dataset()
        if dataset_path is None:
            print("Failed to download dataset. Exiting.")
            return
    
    # Load images and labels
    images, labels, class_counts = load_images(dataset_path)
    print(f"Total images loaded: {len(images)}")
    
    if len(images) == 0:
        print("No images loaded. Exiting.")
        return
    
    # Use the actual class names found in the dataset
    actual_class_names = list(class_counts.keys())
    print(f"Training with {len(actual_class_names)} classes:")
    for i, class_name in enumerate(actual_class_names):
        print(f"{i}: {class_name} - {class_counts[class_name]} images")
    
    # Convert to categorical
    num_classes = len(actual_class_names)
    labels_categorical = tf.keras.utils.to_categorical(labels, num_classes)
    
    # Split dataset
    X_train, X_test, y_train, y_test = train_test_split(
        images, labels_categorical, test_size=VALIDATION_SPLIT, random_state=RANDOM_STATE
    )
    
    # Normalize images
    X_train = X_train / 255.0
    X_test = X_test / 255.0
    
    print(f"Training data shape: {X_train.shape}")
    print(f"Testing data shape: {X_test.shape}")
    
    # Create VGG19 feature extractor
    print("Creating VGG19 feature extractor...")
    vgg_model = VGG19(weights='imagenet', include_top=False, input_shape=(IMG_SIZE, IMG_SIZE, 3))
    
    # Freeze VGG19 layers
    for layer in vgg_model.layers:
        layer.trainable = False
    
    # Process data in batches to avoid memory issues
    print("Extracting features with VGG19 (processing in batches)...")
    
    # Process training data in batches
    batch_size = 32
    num_train_batches = int(np.ceil(len(X_train) / batch_size))
    train_features = []
    
    for i in range(num_train_batches):
        start_idx = i * batch_size
        end_idx = min((i + 1) * batch_size, len(X_train))
        batch = X_train[start_idx:end_idx]
        batch_features = vgg_model.predict(batch)
        batch_features_flat = batch_features.reshape(batch_features.shape[0], -1)
        train_features.append(batch_features_flat)
        print(f"Processed training batch {i+1}/{num_train_batches}")
    
    # Combine batches
    train_features_flat = np.vstack(train_features)
    
    # Process test data in batches
    num_test_batches = int(np.ceil(len(X_test) / batch_size))
    test_features = []
    
    for i in range(num_test_batches):
        start_idx = i * batch_size
        end_idx = min((i + 1) * batch_size, len(X_test))
        batch = X_test[start_idx:end_idx]
        batch_features = vgg_model.predict(batch)
        batch_features_flat = batch_features.reshape(batch_features.shape[0], -1)
        test_features.append(batch_features_flat)
        print(f"Processed testing batch {i+1}/{num_test_batches}")
    
    # Combine batches
    test_features_flat = np.vstack(test_features)
    
    print(f"Feature shape: {train_features_flat.shape}")
    
    # Create and train dense classifier model (similar to original model)
    model = Sequential([
        Dense(200, activation='relu', input_shape=(train_features_flat.shape[1],)),
        Dropout(0.3),  # Add dropout for regularization
        Dense(170, activation='relu'),
        Dropout(0.3),
        Dense(num_classes, activation='softmax')
    ])
    
    model.compile(
        optimizer=Adam(learning_rate=LEARNING_RATE),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    # Train the model
    print("Training model...")
    history = model.fit(
        train_features_flat, y_train,
        epochs=EPOCHS,
        batch_size=BATCH_SIZE,
        validation_data=(test_features_flat, y_test),
        verbose=1
    )
    
    # Evaluate the model
    loss, accuracy = model.evaluate(test_features_flat, y_test)
    print(f"Test accuracy: {accuracy:.4f}")
    
    # Save the model
    model_dir = 'model'
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, 'dermnet_model.h5')
    model.save(model_path)
    print(f"Model saved to {model_path}")
    
    # Save a copy of the VGG19 model for feature extraction
    vgg_path = os.path.join(model_dir, 'vgg19_feature_extractor.h5')
    vgg_model.save(vgg_path)
    print(f"VGG19 feature extractor saved to {vgg_path}")
    
    # Save the actual class names
    class_names_path = os.path.join(model_dir, 'class_names.txt')
    with open(class_names_path, 'w') as f:
        for class_name in actual_class_names:
            f.write(f"{class_name}\n")
    print(f"Class names saved to {class_names_path}")
    
    # Plot training history
    plt.figure(figsize=(12, 4))
    
    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'])
    plt.plot(history.history['val_accuracy'])
    plt.title('Model Accuracy')
    plt.ylabel('Accuracy')
    plt.xlabel('Epoch')
    plt.legend(['Train', 'Validation'], loc='lower right')
    
    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'])
    plt.plot(history.history['val_loss'])
    plt.title('Model Loss')
    plt.ylabel('Loss')
    plt.xlabel('Epoch')
    plt.legend(['Train', 'Validation'], loc='upper right')
    
    plt.tight_layout()
    history_path = os.path.join(model_dir, 'training_history.png')
    plt.savefig(history_path)
    print(f"Training history plot saved to {history_path}")
    
    return model, history, class_counts, actual_class_names

if __name__ == "__main__":
    # If you already downloaded the dataset, you can specify the path here
    # dataset_path = "path/to/dermnet/dataset"
    # Otherwise, it will be downloaded automatically
    train_model() 