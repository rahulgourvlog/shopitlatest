import React, { useEffect, useState } from 'react'
import { useForgotPasswordMutation } from '../../redux/api/userApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email,SetEmail]=useState();
    const [forgotPassword,{isLoading,error,isSuccess}]=useForgotPasswordMutation();
    const {isAuthenticated}=useSelector((state)=>state.auth);
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
e.preventDefault();
const postData={
    email
}
console.log("paos",postData);
forgotPassword(postData)
    }

    useEffect(()=>{
        if(isAuthenticated){
            navigate("/")
        }

        if(error){
            toast.error(error?.data?.message)
        }
        if(isSuccess){
            toast.success("user Has send mail Sucessfully check your inbox");
            
        }
        },[isAuthenticated,error,isSuccess])
  return (
    <>
    <div class="row wrapper">
      <div class="col-10 col-lg-5">
        <form
          class="shadow rounded bg-body"
         onSubmit={handleSubmit}
        >
          <h2 class="mb-4">Forgot Password</h2>
          <div class="mt-3">
            <label for="email_field" class="form-label">Enter Email</label>
            <input
              type="email"
              id="email_field"
              class="form-control"
              name="email"
              value={email}
              onChange={(e)=>SetEmail(e.target.value)}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            class="btn w-100 py-2"
            disabled={isLoading}
          >
          {isLoading ?"Sending....":"Send Email"}  
          </button>
        </form>
      </div>
    </div>
 
    
    </>
  )
}

export default ForgotPassword