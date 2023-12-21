import express from "express";
import cors from "cors";
import 'dotenv/config';
import { Server } from "socket.io";

import chatRouter from "./routes/chat.routes.js";
import userRouter from "./routes/users.route.js";
import messageRouter from "./routes/message.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import { errorHandler } from "./middlewares/error.middlewares.js";
import { initializeSocketIO } from "./socket/index.js";
import { createServer } from "http";
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

app.set("io", io); // using set method to mount the `io` instance on the app to avoid usage of `global`

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};
// global middlewares
app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally

app.use("/api/chats", chatRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/uploads", uploadRouter);

initializeSocketIO(io);

// common error handling middleware
app.use(errorHandler);

export { httpServer };
