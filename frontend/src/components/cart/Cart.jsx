import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeCartItem, setCartItem } from '../../redux/feactures/cartSlice'

const Cart = () => {
    const {cartItems}=useSelector((state)=>state.cart);
    const dispatch=useDispatch();
    const navigate=useNavigate()
    //console.log('cart32',cartItems)
    const increaseQty=(item,qty)=>{
        
      if( qty>=item?.stock){
        return
      }
        const quantity=qty+1;

        handleUpdate(item,quantity)
    }

    const decreaseQty=(item,qty)=>{
       
      if( qty<=1){
        return
      }
        const quantity=qty-1;

        handleUpdate(item,quantity)
    }

    const handleUpdate=(item,qty)=>{
        const cartItem={
          product:item?.product,
          name:item?.name,
          price:item?.price,
          image:item?.image,
          stock:item?.stock,
          quantity:qty
        }
        dispatch(setCartItem(cartItem))
        
      }

      const handleDelete=(id)=>{
        console.log(id,'id')
        dispatch(removeCartItem(id))
      }
  return (
    <>
    {cartItems.length===0 ?(<><h2 class="mt-5">Your Cart is Empty</h2></>) :<>
    <h2 class="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

<div class="row d-flex justify-content-between">
  <div class="col-12 col-lg-8">
    {/* <!-- Cart Items --> */}
    {cartItems.map((items,index)=>{
        return (
            <>
            <hr  key={index}/>
    <div class="cart-item" data-key="product1">
      <div class="row">
        <div class="col-4 col-lg-3">
          <img
            src={items?.image}
            alt="Laptop"
            height="90"
            width="115"
          />
        </div>
        <div class="col-5 col-lg-3">
          <Link to={`/product/${items?.product}`}> {items?.name
} </Link>
        </div>
        <div class="col-4 col-lg-2 mt-4 mt-lg-0">
          <p id="card_item_price">$ {items?.price}</p>
        </div>
        <div class="col-4 col-lg-3 mt-4 mt-lg-0">
          <div class="stockCounter d-inline">
            <span class="btn btn-danger minus" onClick={()=>{decreaseQty(items, items?.quantity)}}> - </span>
            <input
              type="number"
              class="form-control count d-inline"
              value={items?.quantity}
              readonly
            />
            <span class="btn btn-primary plus" onClick={()=>{increaseQty(items, items?.quantity)}}> + </span>
          </div>
        </div>
        <div class="col-4 col-lg-1 mt-4 mt-lg-0">
          <i id="delete_cart_item" class="fa fa-trash btn btn-danger" onClick={()=>{handleDelete(items?.product)}}></i>
        </div>
      </div>
    </div>
    <hr />

            </>
        )
    })}
    
    {/* <!-- Add more cart items here as needed --> */}
  </div>

  <div class="col-12 col-lg-3 my-4">
    <div id="order_summary">
      <h4>Order Summary</h4>
      <hr />
      <p>Units: <span class="order-summary-values">{cartItems?.reduce((acc,item)=>acc+item?.quantity,0)} (Units)</span></p>
      <p>Est. total: <span class="order-summary-values">${cartItems.reduce((acc,item)=>acc+(item?.quantity*item?.price),0)}</span></p>
      <hr />
      <button id="checkout_btn" class="btn btn-primary w-100" onClick={()=>{navigate('/shipping')}}>
        Check out
      </button>
    </div>
  </div>
</div>
    </> }
     
    
    </>
  )
}

export default Cart