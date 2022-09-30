import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3001;

mongoose.connect(process.env.MONGODB_URL).catch((err) => {
  console.error(err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB successfully.");
});

app.use(bodyParser.json());

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
