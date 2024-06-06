import React, { useEffect, useState } from 'react'
import UserLayout from '../layout/UserLayout'
import { useUpdatePasswordMutation } from '../../redux/api/userApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const UpdatePassword = () => {
    const [oldPassword,SetOldPassword]=useState()
    const [newPassword,SetNewPassword]=useState()
    const [updatePassword,{isLoading,error,isSuccess}]=useUpdatePasswordMutation();
    const navigate=useNavigate()
const handleSubmit=(e)=>{
    e.preventDefault();
    const updateData={
        oldPassword:oldPassword,
        password:newPassword
    }
    console.log('pass',updateData);
    updatePassword(updateData)
}

useEffect(()=>{
if(error){
    toast.error(error?.data?.message)
}
if(isSuccess){
    toast.success("updated Successfully");
    navigate('/me/profile')
}
},[error,isSuccess])
  return (
   <>
   <UserLayout>
   <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
          <h2 className="mb-4">Update Password</h2>
          <div className="mb-3">
            <label htmlFor="old_password_field" className="form-label">
              Old Password
            </label>
            <input
              type="password"
              id="old_password_field"
              className="form-control"
              value={oldPassword}
              onChange={(e)=>SetOldPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="new_password_field" className="form-label">
              New Password
            </label>
            <input
              type="password"
              id="new_password_field"
              className="form-control"
              value={newPassword}
              onChange={(e)=>SetNewPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn update-btn w-100" 
          disabled={isLoading}
          >
           
            {isLoading ?'Laoding...':'Update Password'}
          </button>
        </form>
      </div>
    </div>
    </UserLayout>
   
   </>
  )
}

export default UpdatePassword