import { Router } from "express";
import Message from "../models/Message";
import { protect } from "../utils/authMiddleware";

const router = Router();

router.get("/:userId", protect, async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user.id, receiver: req.params.userId },
      { sender: req.params.userId, receiver: req.user.id }
    ]
  }).sort({ createdAt: 1 });
  res.json(messages);
});

export default router;
