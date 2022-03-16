import Errorhandler from '../utils/ErrorHandler.js';
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    success: false,
    message: err.message,

  });
  console.log(`${err.statusCode} ${err.message}`)
};