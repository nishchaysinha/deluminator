class WebSockets {
  users = [];
  connection(socket) {
    socket.on("auth", (userId) => {
      this.users.push({
        socketId: socket.id,
        userId: userId,
        socket: socket,
      });
    });

    socket.on("disconnect", () => {
      this.users = this.users.filter((user) => user.socketId !== socket.id);
    });

    socket.on("requestLocation", (userId2) => {
      console.log("requestLocation");
      const socketId = this.users.find((obj) => obj.userId == userId2);
      socket.to(socketId).emit("approveLocation", socket.userId);
    });

    socket.on("approvedLocation", (userId2) => {
      console.log("approvedLocation");
      const socketId = this.users.find((obj) => obj.userId == userId2);
      socket.to(socketId).emit("approved", socket.userId);
    });

    socket.on("sendLocation", (userId2, location) => {
      console.log("sendLocation");
      const socketId = this.users.find((obj) => obj.userId == userId2);
      socket.to(socketId).emit("receiveLocation", socket.userId, location);
    });

    socket.on("terminate", (userId2) => {
      console.log("terminate");
      const socketId = this.users.find((obj) => obj.userId == userId2);
      socket.to(socketId).emit("terminateLocation", socket.userId);
    });
  }
}

export default new WebSockets();
