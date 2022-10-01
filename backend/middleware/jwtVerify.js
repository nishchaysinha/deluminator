import jwt from "jsonwebtoken";
import { BaseUser } from "../models/user.js";

const jwtVerify = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(400)
      .json({ success: false, message: "No access token provided" });
  }

  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

export default jwtVerify;
