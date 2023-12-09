import { Router } from "express";
import { getUser, loginUser, registerUser } from "../controllers/users.controller.js";

const router = Router();

router.route("/user").get(getUser);
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

export default router;