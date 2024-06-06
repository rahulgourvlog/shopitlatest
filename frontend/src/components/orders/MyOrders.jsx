import React, { useEffect } from 'react'
import { useMyOrdersQuery } from '../../redux/api/orderApi'
import {MDBDataTable} from "mdbreact"
import { Link, useSearchParams } from 'react-router-dom';
import {toast} from "react-hot-toast";
import Loader from "../layout/Loader"
import { useDispatch } from 'react-redux';
import { clearCartItem } from '../../redux/feactures/cartSlice';
const MyOrders = () => {
  const {data,isLoading,error}=useMyOrdersQuery();
  const [searchParams]=useSearchParams()
 const flag=searchParams.get('order_success');
 const dispatch=useDispatch()
 //console.log('fal=>>>',flag)
  useEffect(()=>{
    if(error){
      //console.log('errr',error)
      toast.error(error?.data?.message)
    }
   if(flag){
    dispatch(clearCartItem())
   }
   
    
        },[error])
        if (isLoading) return <Loader/>
  const setOrders=()=>{
let orders={
  columns:[
    {
      label: 'ID',
      field: 'id',
      sort: 'asc'
     
    },
    {
      label: 'Amount Paid',
      field: 'amount',
      sort: 'asc'
     
    },
    {
      label: 'Payment Status',
      field: 'status',
      sort: 'asc'
     
    },
    {
      label: 'Order Status',
      field: 'orderStatus',
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
data?.userOrders?.forEach((order)=>{
  
  orders.rows.push({
    id:order?._id,
    amount:`$ ${order.totalAmount}`,
    status:order?.paymentInfo?.status.toUpperCase(),
    orderStatus:order?.orderStatus,
    actions:(
      <>
      <Link to={`/me/orders/${order?._id}`} className='btn btn-primary'>
        <i className='fa fa-eye'></i>
      </Link>
      <Link to={`/invoice/order/${order?._id}`} className='btn btn-success ms-2'>
        <i className='fa fa-print'></i>
      </Link>
      </>
    )




  })
})
return orders
  }
  return (
    <>
    <div>
      <h1 className='my-5'>{data?.userOrders?.length} Orders</h1>
      <MDBDataTable data={setOrders()} className='px-3' bordered striped hover />
    </div>
    </>
  )
}

export default MyOrders