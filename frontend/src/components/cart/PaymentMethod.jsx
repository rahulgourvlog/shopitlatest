import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { calculateOrderCost } from '../../helper/GetCalculatedValue';
import { useCheckoutsessionMutation, useCreateOrderMutation } from '../../redux/api/orderApi';
import { useNavigate } from "react-router-dom";
import toast from "react"
const PaymentMethod = () => {
    const [method,Setmethod]=useState("");
    const {cartItems,shippingInfo}=useSelector((state)=>state.cart);
    const {ItemsPrice,shippingPrice,taxPrice,totalPrice}=calculateOrderCost(cartItems);
    const [createOrder,{isLoading,error,isSuccess}]=useCreateOrderMutation();
    const [checkoutsession,{data,isLoading:loadCheckout}]=useCheckoutsessionMutation()
   const navigate=useNavigate();

   console.log('check',data)

    useEffect(()=>{
if(error){
  console.log('errr',error)
  toast.error(error?.data?.message)
}
if(isSuccess){
navigate('/me/orders?order_success=true')
}
if(data){
  window.location.href=data?.url
}

    },[error,isSuccess,data])
const submitHandler=(e)=>{
    e.preventDefault();

if(method==='COD'){
   
const orderData={
    shippingInfo,
    orderItems:cartItems,
    itemsPrice:ItemsPrice,
    taxAmount:taxPrice,
    shippingAmount:shippingPrice,
    totalAmount:totalPrice,
    paymentMethod:'COD',
    paymentInfo:{
        status:'Not Paid'
    }
   
}
createOrder(orderData)
//console.log('sass',data)
}
if(method==='Card'){
  const orderData={
    shippingInfo,
    orderItems:cartItems,
    itemsPrice:ItemsPrice,
    taxAmount:taxPrice,
    shippingAmount:shippingPrice,
    totalAmount:totalPrice,
   
   
}
checkoutsession(orderData)
}
}
  return (
   <>
   <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
         onSubmit={submitHandler}
        >
          <h2 className="mb-4">Select Payment Method</h2>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment_mode"
              id="codradio"
              value="COD"
              onChange={()=>Setmethod('COD')}
            />
            <label className="form-check-label" htmlFor="codradio">
              Cash on Delivery
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="payment_mode"
              id="cardradio"
              value="Card"
              onChange={()=>Setmethod('Card')}
            />
            <label className="form-check-label" htmlFor="cardradio">
              Card - VISA, MasterCard
            </label>
          </div>

          <button id="shipping_btn" type="submit" className="btn py-2 w-100" disabled={loadCheckout}>
           {loadCheckout ? 'loading Checkout...':'CONTINUE'} 
          </button>
        </form>
      </div>
    </div>
   </>
  )
}

export default PaymentMethod