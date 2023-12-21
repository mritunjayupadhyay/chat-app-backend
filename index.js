import { httpServer } from "./app.js";
import {connectDB} from "./db/index.js";

const startServer = () => {
    httpServer.listen(8000, () => {
      console.log("⚙️  Server is running on port: " + 8000);
    });
};

try {
    await connectDB();
    startServer();
  } catch (err) {
    console.log("connect error: ", err);
}
