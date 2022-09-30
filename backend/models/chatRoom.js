import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";

const chatRoomSchema = new Schema({
  _id: {
    type: String,
    default: () => randomUUID(),
  },
  users: { type: [String], required: true },
});

const ChatRoom = model("ChatRoom", chatRoomSchema);

export default ChatRoom;
