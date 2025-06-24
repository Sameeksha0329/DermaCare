import cloudinary from "cloudinary";


import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };


cloudinary.v2.api.ping()
  .then(result => console.log("Cloudinary connected:", result))
  .catch(err => console.error("Cloudinary connection failed:", err));