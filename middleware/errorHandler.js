const {constants} = require("../constants")
const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode ? res.statusCode : 400;

    switch (statusCode) {
      case constants.VALIDATION_ERROR:
        res.json({
          title: "Validation Failed",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.UNAUTHORIZED:
        res.json({
          title: "UNAUTHORIZED Failed",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.FORBIDDEN:
        res.json({
          title: "FORBIDDEN Failed",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.NOT_FOUND:
        res.json({
          title: "NOT_FOUND Failed",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      case constants.SERVER_ERROR:
        res.json({
          title: "SERVER_ERROR",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
      default:
         console.log("NO ERROR");
    }

 }

 module.exports = errorHandler