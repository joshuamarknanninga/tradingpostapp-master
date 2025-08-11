import mongoose, { Schema, Document } from "mongoose";

export interface IStreak extends Document {
  user: mongoose.Types.ObjectId;
  lastLogin: Date;
  count: number;
}

const StreakSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  lastLogin: Date,
  count: { type: Number, default: 0 }
});

export default mongoose.model<IStreak>("Streak", StreakSchema);
