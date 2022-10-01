function setUsers(u) {
  WebSockets.users = u;
}

function getUsers() {
  return WebSockets.users;
}

class WebSockets {
  static users = [];
  connection(socket) {
    socket.on("auth", function () {
      let users = getUsers();
      users.push({
        socketId: socket.id,
        userId: socket.userId,
        socket: socket,
      });
    });

    socket.on("disconnect", function () {
      const users = getUsers();
      setUsers(users.filter((user) => user.socketId !== socket.id));
    });

    socket.on("requestLocation", function (userId2) {
      const users = getUsers();
      const socketId = users.find((obj) => obj.userId == userId2).socketId;
      socket.to(socketId).emit("approveLocation", socket.userId);
    });

    socket.on("approvedLocation", function (userId2) {
      const users = getUsers();
      const socketId = users.find((obj) => obj.userId == userId2).socketId;
      socket.to(socketId).emit("approved", socket.userId);
    });

    socket.on("sendLocation", function (userId2, lattitude, longitude) {
      const users = getUsers();
      const socketId = users.find((obj) => obj.userId == userId2).socketId;
      socket
        .to(socketId)
        .emit("receiveLocation", socket.userId, lattitude, longitude);
    });

    socket.on("terminate", function (userId2) {
      const users = getUsers();
      const socketId = users.find((obj) => obj.userId == userId2).socketId;
      socket.to(socketId).emit("terminateLocation", socket.userId);
    });
  }
}

export default WebSockets;
