import { Router } from "express";
import { getUser, loginUser, registerUser, updateUser } from "../controllers/users.controller.js";

const router = Router();

router.route("/").get((req, res) => res.send("Hello World!"));
router.route("/user").get(getUser);
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/:username").put(updateUser);


export default router;