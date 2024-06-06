import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import Users from "../model/user.js"
import jwt from "jsonwebtoken"

export const isAuthenticated=catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies
//console.log(token)
    if(!token){
        return next(new ErrorHandler("Login first to access this resource",401))
    }

 const decode=jwt.verify(token,process.env.SECRET_JWT_KEY)
 req.user=await Users.findById(decode.id)
//console.log(req.user)

next()
})


export const isAuthorised=(...roles)=>{
    return async(req,res,next)=>{
        //console.log(req.user.role)
        if(!roles.includes(req.user.role)){
          return   next(new ErrorHandler(`Role ${req.user.role} is not allowed to access the resource`))
        }
        next()
    }
}