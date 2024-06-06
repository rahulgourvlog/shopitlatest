import catchAsyncError from "../middleware/catchAsyncError.js";
import User from "../model/user.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import { getResetPasswordTemplate } from "../utils/emailTemplate.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import SendToken from "../utils/sendToken.js";
import crypto from "crypto";
//register user api/v1/register
export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  console.log(user);
  const token = await user.getJwtToken();
  console.log(token);
  // res.status(201).json({
  //   token:token
  // })

  SendToken(user, 201, res);
});

//login the user
export const LoginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
console.log("obj",email,password)
  if (!email || !password) {
   
    return next(new ErrorHandler("please enter Email or Password", 401));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("invalid email or password", 401));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("invalid email or password", 401));
  }

  //   const token=await user.getJwtToken()
  // console.log(token)
  //   res.status(200).json({
  //     token:token
  //   })

  SendToken(user, 200, res);
});

export const logOutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    message: "logged Out Sucessfully",
  });
});

// Forgot Password ==> api/v1/password/forgot
export const forgetPasswordforUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("user not found with this Email", 401));
  }
  //console.log(user)
  //get reset password token
  const resetToken = await user.resetPassword();
  console.log("token-->", resetToken);
  await user.save(resetToken);

  // form the reset password url
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = getResetPasswordTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user?.email,
      subject: "ShopIt reset Password",
      message: message,
    });

    res.status(200).json({
      message: `Eamil send Successfully to the email ${user?.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    return next(new ErrorHandler(`${err.message}`, 500));
  }
});

//reset password api/v1/reset/:token
export const resetPasswordforUser = catchAsyncError(async (req, res, next) => {
  console.log(req.params);
  // hash the token coming from params
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset password Token Expires or Invalid", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  SendToken(user, 200, res);
});

// to get the profile of user

// Get User profile ==> api/v1/me
export const getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(
      new ErrorHandler("login first to access this route", 400)
    );
  }
  res.status(200).json({
    user,
  });
});

// to update the password of user
// Update passwrord ==> api/v1/password/update
export const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

    // Check previous password
  const comparePass = await user.comparePassword(req.body.oldPassword);

  if (!comparePass) {
    return next(new ErrorHandler("you password is incorrect", 400));
  }

  user.password = req.body.password;
  user.save();
  res.status(200).json({
    message: "password changed successfully",
  });
});


//to update the User Profile
// Update User Profile ==> api/v1/me/update
export const updateProfile=catchAsyncError(async(req,res,next)=>{
const newUserData={
  name:req.body.name,
  email:req.body.email
}



const user=await User.findByIdAndUpdate(req.user._id,newUserData,{new:true})
res.status(200).json({
  user
})
})

//to upload Avatar
export const uploadAvatar=catchAsyncError(async(req,res,next)=>{
//console.log("avabi", req.body.avatar)
   const avatar_upload=await upload_file(req.body.avatar,"shopIt/avatars");
   //console.log("ava",avatar_upload)
   if(req?.user?.avatar?.url){
    await  delete_file(req?.user?.avatar?.public_id)
   }
   const user=await User.findByIdAndUpdate(req?.user?._id,{avatar:avatar_upload},{new:true});
   //console.log(user,'siif')
   res.status(200).json({user})
})

// Get all the user Admin -> admin login user get all the user 
// Get All Users  ==> api/v1/admin/users
export const getallUsers= catchAsyncError(async(req,res,next)=>{
  const user=await User.find();
  res.status(200).json({
    user
  })
})

// get the user details -ADMIN admin can access any user details
// Get Specific User (User details)  ==> api/v1/admin/users/:id
export const getUserDetails=catchAsyncError(async(req,res,next)=>{
const user =await User.findById(req.params.id);
if (!user) {
  return next(new ErrorHandler("user not found with this userId", 400));
}

res.status(200).json({
  user
})
})

//update the user Details -ADMIN
// Update User Details -ADMIN => /api/v1/admin/users/:id
export const updateUserDetails=catchAsyncError(async(req,res,next)=>{
const newUserData={
  name:req.body.name,
  email:req.body.email,
  role:req.body.role
}
let user=await User.findById(req.params.id)

if (!user) {
  return next(new ErrorHandler("user not found with this userId", 400));
}

 user=await User.findByIdAndUpdate(req.params.id,newUserData,{new:true})
res.status(200).json({
  user
})
})

// Delete User - ADMIN => /api/v1/admin/users/:id

export const deleteUser=catchAsyncError(async(req,res,next)=>{
const user=await User.findById(req.params.id)

if (!user) {
  return next(new ErrorHandler("user not found with this userId", 400));
}

  //TODO -- Remove user avtar from cloudinary

  if(user?.avatar?.public_id){
    await delete_file(user?.avatar?.public_id)
  }
await user.deleteOne();

res.status(200).json({
  success:true
})

})


