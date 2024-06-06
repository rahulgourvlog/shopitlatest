// middleware is the function which runs before the request 
import  ErrorHandler from "../utils/errorHandler.js"
 const errorMiddleware=(err,req,res,next)=>{
let error={
    statusCode:err?.statusCode||500,
    message:err?.message||"internal server error"
}

//handle the invalid mongoose Id error 
// Handle Invalid Mongoose ID Error
  // Checked the errorType and passed to 
  //ErrorHandler to get the specific error.message i.e. Resource not found. Invalid
if(err.name=="CastError"){
   const message=`Resourse not found Invalid ${err.path}`
//    const statusCode=404;
   error=new ErrorHandler(message,404)
}

//handle Moongoose duplicate key error
if(err.code==11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} entered`
 //    const statusCode=404;
    error=new ErrorHandler(message,404)
 }

 //handle wrong jwt error
 if(err.name=="JsonWebTOkenError"){
    const message=`Json token is invalid try Again!!`
 //    const statusCode=404;
    error=new ErrorHandler(message,404)
 }

  //handle Expired jwt Error
  if(err.name=="TokenExpiredError"){
    const message=`Json token is Expired try Again!!`
 //    const statusCode=404;
    error=new ErrorHandler(message,404)
 }

 //Handle Validation Error
  // Checked the errorType and passed to ErrorHandler to get the specific error.message => 
  //Here Converted the Errors object into array of values.
  // Capturing the message of each error
  // Object.values convert into array
if(err.name==="ValidationError"){
    let message=Object.values(err.errors).map((value)=>value.message)
    error=new ErrorHandler(message,400)
}







if(process.env.NODE_ENV=="DEVELOPMENT"){
    res.status(error.statusCode).json({
        message:error.message,
        error:err,
        stack:err.stack
    })
}
if(process.env.NODE_ENV=="PRODUCTION"){
    res.status(error.statusCode).json({
        message:error.message
    })
}

}

export default errorMiddleware