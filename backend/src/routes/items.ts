import { Router } from "express";
import Item from "../models/Item";
import { protect } from "../utils/authMiddleware";

const router = Router();

router.get("/", async (_req, res) => {
  const items = await Item.find().populate("owner", "username");
  res.json(items);
});

router.post("/", protect, async (req, res) => {
  const item = await Item.create({ ...req.body, owner: req.user.id });
  res.json(item);
});

export default router;
