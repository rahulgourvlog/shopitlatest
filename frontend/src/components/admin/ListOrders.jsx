import React, { useEffect } from 'react'

import {MDBDataTable} from "mdbreact"

import {toast} from "react-hot-toast";
import Loader from "../layout/Loader"
import { Link } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import { useAdminOrdersQuery, useDeleteOderMutation } from '../../redux/api/orderApi';


const ListOrders  = () => {
    const {data,isLoading,error}=useAdminOrdersQuery();
    const [deleteOder,{isLoading:deleteLoading,error:deleteEror,isSuccess}]=useDeleteOderMutation()
    console.log('data=>>>>',data)
    useEffect(()=>{
      if(error){
        //console.log('errr',error)
        toast.error(error?.data?.message)
      }
      if(isSuccess){
        toast.success('Order Deleted Successfully !!')
      }
  
          },[error,isSuccess])

          const handleDelete=(id)=>{
            deleteOder(id)
          }
          if (isLoading) return <Loader/>
    const setOrders=()=>{
  let Orders={
    columns:[
      {
        label: 'ID',
        field: 'id',
        sort: 'asc'
       
      },
      {
        label: 'Payment Status',
        field: 'paymentstatus',
        sort: 'asc'
       
      },
      {
        label: 'Order Status',
        field: 'orderstatus',
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

 
  data?.order?.forEach((order)=>{
    
    Orders.rows.push({
      id:order?._id,
      paymentstatus:order?.paymentInfo?.status?.toUpperCase(),
      orderstatus:order?.orderStatus,
      


     
      actions:(
        <>
        <Link to={`/admin/order/${order?._id}`} className='btn btn-outline-primary'>
          <i className='fa fa-pencil'></i>
        </Link>
      
        <button  className='btn btn-outline-danger ms-2' onClick={()=>{handleDelete(order?._id)}} >
          <i className='fa fa-trash'></i>
        </button>
        </>
      )
  
  
  
  
    })
  })
  return Orders
    }
    return (
      <>
      <AdminLayout>
        <h1 className='my-5'>{data?.order?.length} Orders</h1>
        <MDBDataTable data={setOrders()} className='px-3' bordered striped hover />
      </AdminLayout>
      </>
    )
  }
  
  export default  ListOrders 
