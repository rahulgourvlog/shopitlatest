import React, { useEffect, useState } from 'react'
import { useRegisterMutation } from '../../redux/api/authApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user,SetUser]=useState({});
    const {isAuthenticated}=useSelector((state)=>state.auth)
    const [register,{isLoading,error,data}]=useRegisterMutation();
    //console.log("data",data)
    const navigate=useNavigate()
    useEffect(()=>{
      if(isAuthenticated){
        navigate("/")
      }

      if(error){
        toast.error(error?.data?.message)
      }

    },[error])


    const handleSubmit=(e)=>{
e.preventDefault();
console.log(user)
register(user)
    }
    const handleChange=(e)=>{
        const inputname=e.target.name
        SetUser({...user,[inputname]:e.target.value})
    }
  return (
    <>
     <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
         onSubmit={handleSubmit}
        >
          <h2 className="mb-4">Register</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              onChange={handleChange}
            />
          </div>

          <button id="register_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
          {isLoading? "Creating...":"REGISTER"}  
          </button>
        </form>
      </div>
    </div>
    
    </>
  )
}

export default Register