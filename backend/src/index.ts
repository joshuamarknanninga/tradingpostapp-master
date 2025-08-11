import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";
import itemRoutes from "./routes/items";
import shopRoutes from "./routes/shops";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/shops", shopRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
