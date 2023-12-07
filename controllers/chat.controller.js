import {asyncHandler} from "../utils/asyncHandler.utils.js";
const getAllChats = asyncHandler(async (req, res) => {
  
    return res
      .status(200)
      .json(
        { message: "Hello from the server side!", app: "chat-app-controller"}
      );
  });

export { getAllChats}