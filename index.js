import { httpServer } from "./app.js";

const startServer = () => {
    httpServer.listen(8000, () => {
      console.log("⚙️  Server is running on port: " + 8000);
    });
};

try {
    startServer();
  } catch (err) {
    console.log("connect error: ", err);
}
