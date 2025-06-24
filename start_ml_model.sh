#!/bin/bash
echo "Starting the DermaCare ML Model backend..."
echo
cd modelBackend

echo "Ensuring necessary directories exist..."
mkdir -p model
mkdir -p uploads

echo "Checking if class_names.txt exists..."
if [ ! -f model/class_names.txt ]; then
    echo "Creating default class_names.txt file..."
    cat > model/class_names.txt << EOF
Acne and Rosacea Photos
Actinic Keratosis Basal Cell Carcinoma
Atopic Dermatitis Photos
Bullous Disease Photos
Cellulitis Impetigo
Eczema Photos
Exanthems and Drug Eruptions
Hair Loss Photos Alopecia
Herpes HPV and other STDs Photos
Light Diseases and Disorders of Pigmentation
Lupus and other Connective Tissue diseases
Melanoma Skin Cancer Nevi and Moles
Nail Fungus and other Nail Disease
Poison Ivy Photos and other Contact Dermatitis
Psoriasis pictures Lichen Planus and related diseases
Scabies Lyme Disease and other Infestations and Bites
Seborrheic Keratoses and other Benign Tumors
Systemic Disease
Tinea Ringworm Candidiasis and other Fungal Infections
Urticaria Hives
Vascular Tumors
Vasculitis Photos
Warts Molluscum and other Viral Infections
EOF
fi

echo "Checking Python environment..."
if [ -d "myenv" ]; then
    source myenv/bin/activate
    echo "Starting model server on port 5000..."
    python app.py
else
    echo "Python environment not found. Please set up the environment first."
    echo "See README.md for setup instructions."
    read -p "Press any key to continue..." 