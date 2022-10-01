import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BaseUser } from "../models/user.js";

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await BaseUser.findOne({ email });

  if (!(user && (await bcrypt.compare(password, user.password)))) {
    return res.status(401).send("Invalid Credentials");
  }

  const body = {
    type: user.__t,
  };

  if (user.__t == "PrivateUser") {
    let friends = [];
    const friendIds = user.friends;
    for (const id of friendIds) {
      const friend = await BaseUser.findById(id);
      const friendObject = {
        _id: id,
        username: friend.username,
        email: friend.email,
      };
      friends.push(friendObject);
    }
    body.friends = friends;

    const booths = await BaseUser.aggregate([
      { $match: { __t: "PublicUser" } },
      { $project: { password: 0, __t: 0, __v: 0 } },
    ]);
    body.booths = booths;
  }

  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);
  res.setHeader("Authorization", token);

  return res.status(200).json(body);
};

export default loginController;
