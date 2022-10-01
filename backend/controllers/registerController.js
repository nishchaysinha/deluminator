import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrivateUser, PublicUser, BaseUser } from "../models/user.js";

const registerController = async (req, res) => {
  let { username, email, password, isPublic } = req.body;

  email = email.toLowerCase();

  if (await BaseUser.findOne({ email })) {
    return res.status(409).send("User with email already exists");
  }

  password = await bcrypt.hash(password, 10);

  const credentials = {
    username,
    email,
    password,
  };

  if (isPublic) {
    var user = await PublicUser.create(credentials);
  } else {
    var user = await PrivateUser.create(credentials);
  }

  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);
  res.setHeader("Authorization", token);
  return res.status(200).json({ success: true });
};

export default registerController;
