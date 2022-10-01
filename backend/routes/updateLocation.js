import express from "express";
import updateLocationController from "../controllers/updateLocationController.js";

const router = express.Router();

router.post("/", updateLocationController);

export default router;
