import { config } from "dotenv";
config({path: `.env.${process.env.NODE_ENV || "development"}.local`})

export const {
    PORT,
    DB_URL,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_SECRET
} = process.env