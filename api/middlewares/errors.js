import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal Server Error",
  };

  // handle invalid mongoose Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new ErrorHandler(message, 404);
  }

  //handle validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorHandler(message, 400);
  }

  // handle mongoose duplicate key error
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyPattern)}: ${Object.values(
      err.keyValue
    )} already exist`;
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({
    message: error.message,
    error: err,
    stack: err?.stack,
  });
};
