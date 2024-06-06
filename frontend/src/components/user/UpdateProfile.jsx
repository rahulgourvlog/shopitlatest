import React, { useEffect, useState } from 'react'
import UserLayout from '../layout/UserLayout'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUpdateProfileMutation } from '../../redux/api/userApi';
import toast from 'react-hot-toast';
 // on update profile we have the updated the data it updated in backend but on /me/profile still it shows 
 //old name to refetch the data we can use tag  use ProvideTage=['user'] to route need to fetch the data, 
 // then provide invalidateTags to refetch the data 
const UpdateProfile = () => {
    const navigate = useNavigate();
    const [name,Setname]=useState();
    const [email,SetEmail]=useState();
    const {user}=useSelector((state)=>state.auth);
    const[updateProfile,{isLoading,error,isSuccess}]=useUpdateProfileMutation()
    const handleSubmit=(e)=>{
        e.preventDefault();
        const updateData={
            name,email
        }
        updateProfile(updateData)
    }
    useEffect(()=>{
      if(user){
        Setname(user?.name);
        SetEmail(user?.email);
      }  
      if(error){
        toast.error(error?.data?.message)
      }
      if(isSuccess){
        toast.success("updated Sucessfully");
        navigate('/me/profile')
      }
    },[user,error,isSuccess])
  return (
    <>
    <UserLayout>
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form
          className="shadow rounded bg-body"
         onSubmit={handleSubmit}
        >
          <h2 className="mb-4">Update Profile</h2>

          <div className="mb-3">
            <label for="name_field" className="form-label"> Name </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e)=>Setname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label for="email_field" className="form-label"> Email </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e)=>SetEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn update-btn w-100" disabled={isLoading}>{isLoading ?"Updating...":'Update'}
          </button>
        </form>
      </div>
    </div>


    </UserLayout>
    
    </>
  )
}

export default UpdateProfile