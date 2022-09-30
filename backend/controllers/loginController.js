import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BaseUser } from "../models/user.js";

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await BaseUser.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);
    res.setHeader("Authorization", token);
    return res.status(200).json({ success: true });
  }

  return res.status(401).send("Invalid Credentials");
};

export default loginController;
