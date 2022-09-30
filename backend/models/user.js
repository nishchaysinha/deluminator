import { Schema, model } from "mongoose";

const baseUserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const BaseUser = model("BaseUser", baseUserSchema);

export const PrivateUser = BaseUser.discriminator(
  "PrivateUser",
  new Schema({ friends: [{ type: Schema.Types.ObjectId, ref: "User" }] })
);

export const PublicUser = BaseUser.discriminator(
  "PublicUser",
  new Schema({ location: String })
);

