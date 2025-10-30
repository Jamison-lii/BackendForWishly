import { Schema, model } from "mongoose";

const cardSchema = new Schema(
  {
    name: { type: String, required: true },
    messages: { type: [String], default: [] }, // array of messages
    images: { type: [String], default: [] }, // file paths (relative URLs)
    song: { type: String, default: null }, // file path
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model("Card", cardSchema);
