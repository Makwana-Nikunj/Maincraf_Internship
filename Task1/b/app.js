import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { uploadOnCloudinary } from "./claudinary.js";
import { Product } from "./db.js";


const app = express();

const uploadDir = path.resolve("public", "temp");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({ storage });

// Middleware
app.use(
    cors({
        origin: [process.env.CLIENT_URL, "http://localhost:5173"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "16kb" }));


app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/api/products", upload.single("ImageUrl"), async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: "name and price are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "ImageUrl file is required" });
        }

        const imageUrl = await uploadOnCloudinary(req.file.path);
        const product = await Product.create({
            name,
            price: Number(price),
            ImageUrl: imageUrl.secure_url,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { app };