import express from "express";
import jwtVerify from "../middleware/jwtVerify.js";
import joinChatController from "../controllers/chat/joinChatController.js";

const router = express.Router();

router.post("/join", jwtVerify, joinChatController);

export default router;
