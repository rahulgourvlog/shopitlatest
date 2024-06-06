import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { calculateOrderCost } from '../../helper/GetCalculatedValue';
import CheckOutSteps from './CheckOutSteps';

const ConfirmOrder = () => {
     const {cartItems,shippingInfo}=useSelector((state)=>state.cart);
     const {ItemsPrice,shippingPrice,taxPrice,totalPrice}=calculateOrderCost(cartItems)
     const {user}=useSelector((state)=>state.auth);

    //  console.log("cartItem",cartItems)
    //  console.log("shipp",shippingInfo)
    //  console.log("shipp",shippingInfo)
  return (
   <>
   <CheckOutSteps shipping ConfirmOrder/>
    <div class="row d-flex justify-content-between">
      <div class="col-12 col-lg-8 mt-5 order-confirm">
        <h4 class="mb-3">Shipping Info</h4>
        <p><b>Name:  </b> {user?.name} </p>
        <p><b>Phone:</b> {shippingInfo?.phoneNo}</p>
        <p class="mb-4">
          <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.postalCode}, {shippingInfo?.country}
        </p>

        <hr />
        <h4 class="mt-4">Your Cart Items:</h4>

{cartItems.map((items,index)=>{
    return (
        <>
          <hr />
        <div class="cart-item my-1" key={index}>
          <div class="row">
            <div class="col-4 col-lg-2">
              <img
                src={items?.image}
                alt="Laptop"
                height="45"
                width="65"
              />
            </div>

            <div class="col-5 col-lg-6">
              <Link to={`/product/${items?.product}`}>{items?.name}</Link>
            </div>

            <div class="col-4 col-lg-4 mt-4 mt-lg-0">
              <p>{items?.quantity} x ${items?.price} = <b>${items?.price * items?.quantity}</b></p>
            </div>
          </div>
        </div>
        <hr />
        </>
    )
})}
      
      </div>

      <div class="col-12 col-lg-3 my-4">
        <div id="order_summary">
          <h4>Order Summary</h4>
          <hr />
          <p>Subtotal: <span class="order-summary-values">${ItemsPrice}</span></p>
          <p>Shipping: <span class="order-summary-values">$ {shippingPrice}</span></p>
          <p>Tax: <span class="order-summary-values">$ {taxPrice}</span></p>

          <hr />

          <p>Total: <span class="order-summary-values">$ {totalPrice}</span></p>

          <hr />
          <Link to="/payment_method" id="checkout_btn" class="btn btn-primary w-100">
            Proceed to Payment
          </Link>
        </div>
      </div>
    </div>
   </>
  )
}

export default ConfirmOrder