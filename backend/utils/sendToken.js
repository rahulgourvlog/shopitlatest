 const SendToken=async(user,statusCode,res)=>{

const token= await user.getJwtToken();

const options={
    expires:new Date(Date.now()+process.env.COKKIE_EXPIRY_TIME*24*60*60*1000),
    httpOnly:true
    //client cannot able to see the cookie in frontEnd that why use httpOnly:true
}

res.status(statusCode).cookie("token",token,options).json({
    token:token
})
}


export default SendToken