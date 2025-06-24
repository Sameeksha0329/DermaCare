@echo off
echo Starting the DermaCare ML Model backend...
echo.
cd modelBackend

echo Ensuring necessary directories exist...
if not exist model mkdir model
if not exist uploads mkdir uploads

echo Checking if class_names.txt exists...
if not exist model\class_names.txt (
    echo Creating default class_names.txt file...
    (
        echo Acne and Rosacea Photos
        echo Actinic Keratosis Basal Cell Carcinoma
        echo Atopic Dermatitis Photos
        echo Bullous Disease Photos
        echo Cellulitis Impetigo
        echo Eczema Photos
        echo Exanthems and Drug Eruptions
        echo Hair Loss Photos Alopecia
        echo Herpes HPV and other STDs Photos
        echo Light Diseases and Disorders of Pigmentation
        echo Lupus and other Connective Tissue diseases
        echo Melanoma Skin Cancer Nevi and Moles
        echo Nail Fungus and other Nail Disease
        echo Poison Ivy Photos and other Contact Dermatitis
        echo Psoriasis pictures Lichen Planus and related diseases
        echo Scabies Lyme Disease and other Infestations and Bites
        echo Seborrheic Keratoses and other Benign Tumors
        echo Systemic Disease
        echo Tinea Ringworm Candidiasis and other Fungal Infections
        echo Urticaria Hives
        echo Vascular Tumors
        echo Vasculitis Photos
        echo Warts Molluscum and other Viral Infections
    ) > model\class_names.txt
)

echo Checking Python environment...
if exist myenv\Scripts\activate (
    call myenv\Scripts\activate
    echo Starting model server on port 5000...
    python app.py
) else (
    echo Python environment not found. Please set up the environment first.
    echo See README.md for setup instructions.
    pause
)
pause 