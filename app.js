import express from "express";
import cors from "cors";

import chatRouter from "./routes/chat.routes.js";
import userRouter from "./routes/users.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";

import { createServer } from "http";
const app = express();
const httpServer = createServer(app);

// global middlewares
app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally

app.use("/chats", chatRouter);
app.use("/users", userRouter);

// common error handling middleware
app.use(errorHandler);

export { httpServer };
