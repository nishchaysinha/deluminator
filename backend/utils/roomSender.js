import ChatRoom from "../models/chatRoom.js";

const roomSender = async (userId1, userId2) => {
  const availableRoom = await ChatRoom.findOne({
    users: { $all: [userId1, userId2] },
  });
  if (availableRoom) {
    return availableRoom._id;
  }
  const newRoom = await ChatRoom.create({
    users: [userId1, userId2],
  });

  return newRoom._id;
};

export default roomSender;
