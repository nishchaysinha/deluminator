import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";

const baseUserSchema = new Schema({
  _id: {
    type: String,
    default: () => randomUUID(),
  },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const BaseUser = model("BaseUser", baseUserSchema);

export const PrivateUser = BaseUser.discriminator(
  "PrivateUser",
  new Schema({
    friends: [String],
    invites: [String],
  })
);

export const PublicUser = BaseUser.discriminator(
  "PublicUser",
  new Schema({ location: String })
);
