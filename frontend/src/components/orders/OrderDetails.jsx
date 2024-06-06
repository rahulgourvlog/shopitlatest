import React, { useEffect } from 'react'
import {useParams,Link} from 'react-router-dom'
import {useMyOrderDetailsQuery} from "../../redux/api/orderApi"
import toast from 'react-hot-toast';
const OrderDetails = () => {
    const params=useParams();
   
    const {data,isLoading,error}=useMyOrderDetailsQuery(params.id);
    const orders=data?.order || {};
    const{shippingInfo,paymentInfo,orderItems,itemsPrice,user,totalAmount}=orders
    useEffect(()=>{
        if(error){
          console.log('errr',error)
          toast.error(error?.data?.message)
        }
       
       
        
            },[error])
  return (
   <>
   <div className="row d-flex justify-content-center">
      <div className="col-12 col-lg-9 mt-5 order-details">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mt-5 mb-4">Your Order Details</h3>
          <Link className="btn btn-success" to={`/invoice/order/${orders?._id}`}>
            <i className="fa fa-print"></i> Invoice
          </Link>
        </div>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">ID</th>
              <td>{orders?._id}</td>
            </tr>
            <tr>
              <th scope="row">Status</th>
              <td className={String(orders?.orderStatus).includes('Delivered') ? "greenColor":'redColor'}>
                <b>{orders?.orderStatus}</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Date</th>
              <td>{new Date(orders?.createdAt).toLocaleString('en-US')}</td>
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
    </div>
   
   
   </>
  )
}

export default OrderDetails