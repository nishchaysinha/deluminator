import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";
import friendRouter from "./routes/friend.js";
import chatRouter from "./routes/chat.js";
import updateLocationRouter from "./routes/updateLocation.js";
import jwtSockets from "./middleware/jwtSockets.js";
import WebSockets from "./utils/WebSockets.js";
import cors from "cors";

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer);
const WebSocket = new WebSockets();
io.use(jwtSockets).on("connection", WebSocket.connection);

import dotenv from "dotenv";
dotenv.config();

const port = 3002;

mongoose.connect(process.env.MONGODB_URL).catch((err) => {
  console.error(err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB successfully.");
});

app.use(bodyParser.json());

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/friend", friendRouter);
app.use("/api/chat", chatRouter);
app.use("/api/update", updateLocationRouter);

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
