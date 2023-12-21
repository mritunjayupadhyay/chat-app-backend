import { asyncHandler } from "../utils/asyncHandler.utils.js";

/**
 *
 * @param {Error | ApiError} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 *
 *
 * @description This middleware is responsible to catch the errors from any request handler wrapped inside the {@link asyncHandler}
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  const response = {
    ...error,
    message: error.message,
  };

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
