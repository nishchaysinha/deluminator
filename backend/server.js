import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import dotenv from "dotenv";
dotenv.config()

const app = express();
const port = 3001;

mongoose.connect(process.env.MONGODB_URL).catch((err) => {
  console.error(err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB successfully.");
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
