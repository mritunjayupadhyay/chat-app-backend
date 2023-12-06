import express from "express";
import chatRouter from "./routes/chat.routes.js";

import { createServer } from "http";
const app = express();
const httpServer = createServer(app);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure static file to save images locally

app.use("/api/chats", chatRouter);

export { httpServer };
