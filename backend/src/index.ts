import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth";
import itemRoutes from "./routes/items";
import shopRoutes from "./routes/shops";
import chatRoutes from "./routes/chat";
import xpRoutes from "./routes/xp";
import Message from "./models/Message";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/xp", xpRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("sendMessage", async (data) => {
    const { sender, receiver, content } = data;
    const msg = await Message.create({ sender, receiver, content });
    io.emit(`chat-${receiver}`, msg);
    io.emit(`chat-${sender}`, msg);
  });

  socket.on("disconnect", () => console.log("User disconnected"));
});

server.listen(5000, () => console.log("Server running on http://localhost:5000"));

