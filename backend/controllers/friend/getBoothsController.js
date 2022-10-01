import { BaseUser } from "../../models/user.js";

const getBoothsController = async (req, res) => {
  const booths = await BaseUser.aggregate([
    { $match: { __t: "PublicUser" } },
    { $project: { password: 0, __t: 0, __v: 0 } },
  ]);

  return res.status(200).json(booths);
};

export default getBoothsController;
