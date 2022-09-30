import { Schema, model } from "mongoose";

const message = new Schema({
  _id: {
    type: String,
    default: () => randomUUID(),
  },
  sentBy: { type: String, required: true },
  chatRoom: { type: String, required: true },
  createdAt: { type: String, default: Date.now },
});
