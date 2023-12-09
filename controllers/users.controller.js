import {asyncHandler} from "../utils/asyncHandler.utils.js";
import {User} from "../models/User.model.js";
import {ApiError} from "../utils/ApiError.utils.js";
import {ApiResponse} from "../utils/ApiResponse.utils.js";

const getUser = asyncHandler(async (req, res) => {
  
  const { email, username } = req.query;
  console.log("email: ", email, username);

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
    return res
      .status(200)
      .json(
        { error: false, data: user },
      );
  });

  const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, role, name } = req.body;
  
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
  
    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists", []);
    }
    const user = await User.create({
      email,
      password,
      username,
      name,
      role: role || UserRolesEnum.USER,
    });
  
    await user.save();
  
    const createdUser = await User.findById(user._id).select(
      "-password"
    );
  
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user");
    }
  
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          { user: createdUser },
          "Users registered successfully and verification email has been sent on your email."
        )
      );
  });
  
  const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
  
    if (!username && !email) {
      throw new ApiError(400, "Username or email is required");
    }
  
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });
  
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }
  
    // Compare the incoming password with hashed password
    const isPasswordValid = await user.isPasswordCorrect(password);
  
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }
  
    const accessToken = user.generateAccessToken()
  
    // get the user document ignoring the password
    const loggedInUser = await User.findById(user._id).select(
      "-password"
    );
  
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken }, // send access token in response if client decides to save them by themselves
          "User logged in successfully"
        )
      );
  });

export { getUser, loginUser, registerUser }