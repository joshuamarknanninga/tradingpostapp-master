import { Router } from "express";
import Shop from "../models/Shop";
import { protect } from "../utils/authMiddleware";

const router = Router();

router.get("/", async (_req, res) => {
  const shops = await Shop.find().populate("owner", "username");
  res.json(shops);
});

router.post("/", protect, async (req, res) => {
  const shop = await Shop.create({ ...req.body, owner: req.user.id });
  res.json(shop);
});

export default router;
