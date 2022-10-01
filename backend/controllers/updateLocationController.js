import { BaseUser } from "../models/user";

const updateLocationController = async (req, res) => {
  const user = await BaseUser.findById(req.user.user_id);
  user.location = req.boby.location;
  user.save();

  return res.status(200).json({ location: user.location });
};

export default updateLocationController;
