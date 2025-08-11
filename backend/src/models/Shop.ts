import mongoose, { Schema, Document } from "mongoose";

export interface IShop extends Document {
  name: string;
  owner: mongoose.Types.ObjectId;
  description: string;
}

const ShopSchema: Schema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  description: String
});

export default mongoose.model<IShop>("Shop", ShopSchema);
