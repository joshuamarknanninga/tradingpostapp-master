import { Router } from "express";
import User from "../models/User";
import Streak from "../models/Streak";
import { protect } from "../utils/authMiddleware";
import dayjs from "dayjs";

const router = Router();

router.post("/gain", protect, async (req, res) => {
  const { amount } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.xp += amount;
  await user.save();
  res.json({ xp: user.xp });
});

router.post("/login-streak", protect, async (req, res) => {
  let streak = await Streak.findOne({ user: req.user.id });
  const today = dayjs().startOf("day");

  if (!streak) {
    streak = await Streak.create({ user: req.user.id, lastLogin: today.toDate(), count: 1 });
  } else {
    const last = dayjs(streak.lastLogin).startOf("day");
    if (today.diff(last, "day") === 1) {
      streak.count += 1;
    } else if (today.diff(last, "day") > 1) {
      streak.count = 1;
    }
    streak.lastLogin = today.toDate();
    await streak.save();
  }

  router.post("/gain-demo", protect, async (req, res) => {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
  
    user.xp += amount || 50; // default +50 XP
    await user.save();
  
    res.json({ xp: user.xp });
  });
  
  await User.findByIdAndUpdate(req.user.id, { $inc: { xp: 5 } }); // small XP boost for login
  res.json(streak);
});

export default router;
