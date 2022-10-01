import jwt from "jsonwebtoken";

const jwtSockets = (socket, next) => {
  if (!socket.handshake.query.token) {
    next(new Error("No JWT token provided"));
  }

  const token = socket.handshake.query.token;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    socket.userId = decoded.user_id;
  } catch (error) {
    return next(new Error("Incorrect JWT Token."));
  }

  return next();
};

export default jwtSockets;
