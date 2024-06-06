import React, { useEffect } from 'react'

import {MDBDataTable} from "mdbreact"
import {toast} from "react-hot-toast";

import Loader from "../layout/Loader"
import { Link } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import { useDeleteUserMutation, useGetUsersQuery } from '../../redux/api/userApi';



const ListUsers  = () => {
    const {data,isLoading,error}=useGetUsersQuery();
    const[deleteUser,{isLoading:delLoading,error:errorDelete,isSuccess}]=useDeleteUserMutation()
    console.log('data=>>>>',data)
    useEffect(()=>{
      if(error){
        //console.log('errr',error)
        toast.error(error?.data?.message)
      }
     if(isSuccess){
      toast.success('user Deleted Successfully !!')
     }
  
          },[error,isSuccess])

          const handleDelete=(id)=>{
           deleteUser(id)
          }
          if (isLoading) return <Loader/>
    const setUsers=()=>{
  let Users={
    columns:[
      {
        label: 'ID',
        field: 'id',
        sort: 'asc'
       
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc'
       
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc'
       
      },
      {
        label: 'Role',
        field: 'role',
        sort: 'asc'
       
      },
      
      {
        label: 'Actions',
        field: 'actions',
        sort: 'asc'
       
      }
      
    ],
    rows:[
  
    ],
   
  }

 
  data?.user?.forEach((user)=>{
    
    Users.rows.push({
      id:user?._id,
    name:user?.name,
    email:user?.email,
    role:user?.role,
      


     
      actions:(
        <>
        <Link to={`/admin/users/${user?._id}`} className='btn btn-outline-primary'>
          <i className='fa fa-pencil'></i>
        </Link>
      
        <button  className='btn btn-outline-danger ms-2' 
         onClick={()=>{handleDelete(user?._id)}} 
         disabled={delLoading}
        >
          <i className='fa fa-trash'></i>
        </button>
        </>
      )
  
  
  
  
    })
  })
  return Users
    }
    return (
      <>
      <AdminLayout>
        <h1 className='my-5'>{data?.user?.length} Users</h1>
        <MDBDataTable data={setUsers()} className='px-3' bordered striped hover />
      </AdminLayout>
      </>
    )
  }
  
  export default  ListUsers 
