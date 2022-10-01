import express from "express";
import jwtVerify from "../middleware/jwtVerify.js";
import addFriendsController from "../controllers/friend/addFriendsController.js";
import confirmFriendsController from "../controllers/friend/confirmFriendsController.js";
import getFriendsController from "../controllers/friend/getFriendsController.js";

const router = express.Router();

router
    .post("/add", jwtVerify, addFriendsController)
    .post("/confirm", jwtVerify, confirmFriendsController)
    .get("/get/friends", jwtVerify, getFriendsController);

export default router;
