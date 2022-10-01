import ChatRoom from "../../models/chatRoom.js";

const joinChatController = async (req, res) => {
  const userIDs = req.body.userIDs;
  const id = req.user.user_id;
  userIDs.push(id);

  const availableRoom = await ChatRoom.findOne({
    users: { $size: userIDs.length, $all: [...userIDs] },
  });

  if (availableRoom) {
    return res.json({ isNew: false, roomId: availableRoom._id });
  }

  const newRoom = await ChatRoom.create({
    users: userIDs,
  });

  return res.json({ isNew: true, roomId: newRoom._id });
};

export default joinChatController;
