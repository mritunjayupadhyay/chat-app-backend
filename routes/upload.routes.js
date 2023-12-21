import { Router } from "express";
import { getSignedUrlFunc } from "../controllers/upload.controller.js";

const router = Router();

router.route("/").get((req, res) => res.send("Hello World! from upload"));
router.route("/signed_url").post(getSignedUrlFunc);

export default router;