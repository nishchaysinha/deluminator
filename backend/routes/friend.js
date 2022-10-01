import express from "express";
import jwtVerify from "../middleware/jwtVerify.js";
import addFriendsController from "../controllers/friend/addFriendsController.js";
import confirmFriendsController from "../controllers/friend/confirmFriendsController.js";

const router = express.Router();

router.post("/add", jwtVerify, addFriendsController);
router.post("/confirm", jwtVerify, confirmFriendsController);

export default router;

