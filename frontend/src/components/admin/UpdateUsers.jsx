import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { useNavigate, useParams } from 'react-router-dom';
import {  useGetUsersDetailsQuery, useUpdateUserDetailMutation } from '../../redux/api/userApi';
import {toast} from "react-hot-toast";
const UpdateUsers = () => {
  const navigate = useNavigate();
  const [name,Setname]=useState();
  const [email,SetEmail]=useState();
  const [role,SetRole]=useState();
  const params=useParams()
 const {data}=useGetUsersDetailsQuery(params?.id)
  const[updateUserDetail,{isLoading,error,isSuccess}]=useUpdateUserDetailMutation()

  console.log('data=>>>',data)
  const handleSubmit=(e)=>{
      e.preventDefault();
      const updateData={
          name,email,role
      }
      updateUserDetail({id:params.id,body:updateData})
  }
  useEffect(()=>{
    if(data){
      Setname(data?.user?.name);
      SetEmail(data?.user?.email);
      SetRole(data?.user?.role);
    }  
    if(error){
      toast.error(error?.data?.message)
    }
    if(isSuccess){
      toast.success("updated Sucessfully !!");
      navigate('/admin/users')
     }
  },[data,error,isSuccess])
  return (
    <>
    <AdminLayout>
     <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form className="shadow-lg" onSubmit={handleSubmit}>
          <h2 className="mb-4">Update User</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">Name</label>
            <input
              type="name"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={((e)=>{Setname(e.target.value)})}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={((e)=>{SetEmail(e.target.value)})}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role_field" className="form-label">Role</label>
            <select id="role_field" className="form-select" name="role"  value={role}
              onChange={((e)=>{SetRole(e.target.value)})}>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <button type="submit" className="btn update-btn w-100 py-2" disabled={isLoading}>
         {isLoading? "Updating...":'Update'}   
          </button>
        </form>
      </div>
    </div>
    </AdminLayout>
    </>
  )
}

export default UpdateUsers