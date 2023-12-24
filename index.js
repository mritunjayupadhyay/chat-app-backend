import { httpServer } from "./app.js";
import {connectDB} from "./db/index.js";

const PORT = process.env.PORT || 8000;
const startServer = () => {
    
    httpServer.listen(PORT, () => {
      console.log("⚙️  Server is running on port: " + PORT);
    });
};

try {
    await connectDB();
    startServer();
  } catch (err) {
    console.log("connect error: ", err);
}
