import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
  title: string;
  description: string;
  price: number;
  image: string;
  owner: mongoose.Types.ObjectId;
}

const ItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model<IItem>("Item", ItemSchema);
