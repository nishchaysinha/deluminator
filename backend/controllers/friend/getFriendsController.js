import { BaseUser } from "../../models/user.js";

const getFriendsController = async (req, res) => {
  const user = await BaseUser.findById(req.user.user_id);
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
  return res.status(200).json(friends);
};

export default getFriendsController;
