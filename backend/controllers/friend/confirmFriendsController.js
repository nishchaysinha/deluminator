import { BaseUser } from "../../models/user.js";

const confirmFriendsController = async (req, res) => {
  const recipientUser = await BaseUser.findById(req.user.user_id);
  const confirmedUser = await BaseUser.findById(req.body.userID);

  recipientUser.friends.push(req.body.userID);
  const index = recipientUser.invites.findIndex((id) => {
    return id == req.user.userID;
  });
  recipientUser.invites.splice(index, 1);
  recipientUser.save();

  confirmedUser.friends.push(req.user.user_id);
  confirmedUser.save();

  return res.status(200).json({ success: true });
};

export default confirmFriendsController;
