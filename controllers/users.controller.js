import {asyncHandler} from "../utils/asyncHandler.utils.js";
const getAllUsers = asyncHandler(async (req, res) => {
  
    return res
      .status(200)
      .json(
        { data: [], error: false}
      );
  });

export { getAllUsers}