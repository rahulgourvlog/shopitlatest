import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { Link, useParams } from 'react-router-dom';
import { useAdminOrdersQuery, useMyOrderDetailsQuery, useUpdateOrdersMutation } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';

const ProcessOrder = () => {
    const params=useParams();
   const [status,Setstatus]=useState('')
    const {data}=useMyOrderDetailsQuery(params.id);
    const [updateOrders,{isLoading,error,isSuccess}]=useUpdateOrdersMutation()
    const orders=data?.order || {};
    const{shippingInfo,paymentInfo,orderItems,itemsPrice,user,totalAmount}=orders
   // console.log('orders=>>>>>',orders)
    useEffect(()=>{
      if(orders?.orderStatus){
        Setstatus(orders?.orderStatus)
      }
        if(error){
          console.log('errr',error)
          toast.error(error?.data?.message)
        }
       if(isSuccess){
        toast.success('Order Updated Successfully !!')
       }
       
        
            },[error,isSuccess])

            const handleClick=()=>{
              console.log("status=>>>>",status)

              updateOrders({id:params?.id,body:{status:status}})
            }
  return (
   <>
   <AdminLayout>
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-8 order-details">
        <h3 className="mt-5 mb-4">Order Details</h3>

        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">ID</th>
              <td>{orders?._id}</td>
            </tr>
            <tr>
              <th scope="row">Order Status</th>
              <td className={String(orders?.orderStatus).includes('Delivered') ? "greenColor":'redColor'}>
                <b>{orders?.orderStatus}</b>
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Shipping Info</h3>
        <table className="table table-striped table-bordered">
        <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <th scope="row">Phone No</th>
              <td>{shippingInfo?.phoneNo}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>{shippingInfo?.address},{shippingInfo?.city},{shippingInfo?.zipCode}, {shippingInfo?.country}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Payment Info</h3>
        <table className="table table-striped table-bordered">
        <tbody>
            <tr>
              <th scope="row">Status</th>
              <td className={paymentInfo?.status ==='Paid' ?"greenColor":'redColor'}>
                <b>{paymentInfo?.status}</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Method</th>
              <td>{orders?.paymentMethod}</td>
            </tr>
            <tr>
              <th scope="row">Stripe ID</th>
              <td>{paymentInfo?.id || 'Nill'}</td>
            </tr>
            <tr>
              <th scope="row">Amount Paid</th>
              <td>$ {totalAmount}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 my-4">Order Items:</h3>

        {orderItems?.map((item,index)=>{
    return (<>
        <hr />
        <div className="cart-item my-1" key={index}>
          <div className="row my-5">
            <div className="col-4 col-lg-2">
              <img
                src={item?.image}
                alt={item?.name}
                height="45"
                width="65"
              />
            </div>

            <div className="col-5 col-lg-5">
              <Link to={`/product/${item?.product}`}>{item?.name}</Link>
            </div>

            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
              <p>$ {item?.price}</p>
            </div>

            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
              <p>{item?.quantity} Piece(s)</p>
            </div>
          </div>
        
        </div>
        <hr />
        </>
    )
})}
      </div>

      <div className="col-12 col-lg-3 mt-5">
        <h4 className="my-4">Status</h4>

        <div className="mb-3">
          <select className="form-select" name="status" value={status} onChange={(e)=>{Setstatus(e.target.value)}}>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <button className="btn btn-primary w-100" disabled={isLoading} onClick={handleClick}>
          {isLoading ? 'Updating...':'Update Status'}</button>

        <h4 className="mt-5 mb-3">Order Invoice</h4>
        <Link to={`/invoice/order/${orders?._id}`} className="btn btn-success w-100">
          <i className="fa fa-print"></i> Generate Invoice
        </Link>
      </div>
    </div>
    </AdminLayout>
   </>
  )
}

export default ProcessOrder