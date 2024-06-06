import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
const userSchema=new mongoose.Schema({
    name:{
        type:String,
     required:[true,"please enter you name"],
     maxLength:[50,"you name cannnot exceed 50 characters"]
    },
    email:{
        type:String,
        required:[true,"please enter you email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please enter the password"],
        minLength:[6,"password should  be longer than 6 character"],
        select:false
        //we will not send the password in response
    },
    avatar:{
        public_id:String,
        url:String
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date
},{timestamps:true})

//save the password in the encrypted form before creating the user

userSchema.pre("save",async function (next){

   // if not modified then next 
    if(!this.isModified("password")){
next()
    }

   this.password=await bcryptjs.hash(this.password,10)
})

userSchema.methods.getJwtToken=async function(){
  return jwt.sign({id:this._id},process.env.SECRET_JWT_KEY,{
    expiresIn:process.env.EXPIRES_JWT_TIME
 })
}


userSchema.methods.comparePassword= async function(enteredPassword){
 return await bcryptjs.compare(enteredPassword,this.password)
}


//to generate the token 

userSchema.methods.resetPassword=async function(){
// generate the random byte using crypto
const resetToken=crypto.randomBytes(20).toString("hex");

// converting to the hex save to resetPasswordToken
this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
this.resetPasswordExpires=Date.now()+30*60*1000;
console.log("resetPass",this.resetPasswordToken)
console.log("resettime",this.resetPasswordExpires)

return resetToken
}


const model =mongoose.model("User",userSchema);
export default model;
