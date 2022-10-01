import { BaseUser } from "../../models/user.js";

const addFriendsController = async (req, res) => {
  const recipientUser = await BaseUser.findById(req.body.userID);
    recipientUser.invites.push(req.user.user_id);
    recipientUser.save()

  return res.status(200).json({ success: true });
};

export default addFriendsController;
