import { Router } from "express";

import { upload } from "../middlewares/multer.middlewares.js";
import { mongoIdPathVariableValidator } from "../validators/mongodb.validators.js";
import { validate } from "../validators/validate.js";
import {
    getAllMessages,
    sendMessage,
  } from "../controllers/message.controller.js";
  import {
    sendMessageValidator
  } from "../validators/message.validators.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.use(verifyJWT);

router
  .route("/:chatId")
  .get(mongoIdPathVariableValidator("chatId"), validate, getAllMessages)
  .post(
    upload.fields([{ name: "attachments", maxCount: 5 }]),
    mongoIdPathVariableValidator("chatId"),
    sendMessageValidator(),
    validate,
    sendMessage
  );

export default router;
