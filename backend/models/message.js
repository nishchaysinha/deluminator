import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  _id: {
    type: String,
    default: () => randomUUID(),
  },
  sentBy: { type: String, required: true },
  text: { type: String, required: true },
  chatRoom: { type: String, required: true },
  createdAt: { type: String, default: Date.now },
});

const Message = model("Message", messageSchema);

export default Message;
