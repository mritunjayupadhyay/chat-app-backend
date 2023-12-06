import { Router } from "express";
import { getAllChats } from "../controllers/chat.controller.js";

const router = Router();

router.route("/").get(getAllChats);

export default router;