import { body, oneOf } from "express-validator";

const sendMessageValidator = () => {
  return [
    oneOf([
      body("content")
      .trim()
      .optional()
      .notEmpty(),
      body("attachments").isArray(),
    ], {
      message: 'At least one of message or attachment must be provided',
    }),
  ];
};

export { sendMessageValidator };
