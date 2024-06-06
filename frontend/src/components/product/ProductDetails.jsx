import React, { useEffect, useState } from 'react'
import {Link, useParams} from "react-router-dom"
import { useGetProductsDetailsQuery } from '../../redux/api/productsApi'
import StarRatings from 'react-star-ratings'
import toast from "react-hot-toast"
import Loader from '../layout/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItem } from '../../redux/feactures/cartSlice'
import NewReviews from '../reviews/NewReviews'
import ListReviews from '../reviews/ListReviews'
import Notfound from '../layout/Notfound'


const ProductDetails = () => {
  const[activeImage,SetActiveImg]=useState("");
  const[quantity,Setquantity]=useState(1)

 const {cartItems}=useSelector((state)=>state.cart);
 //console.log('cart1',cartItems)
    const params=useParams()
    //console.log(params,"paramas")
    const {data, isLoading,isError,error}=useGetProductsDetailsQuery(params.id);
   // console.log(data,"datas")
const {isAuthenticated}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    
    const product=data?.products;
    console.log('product',product)
    useEffect(()=>{
        SetActiveImg(product?.images[0]?product.images[0]?.url:'./images/default_product.png')
    },[product])

    const handleClick=()=>{
      const cartItem={
        product:product?._id,
        name:product?.name,
        price:product?.price,
        image:product?.images[0]?.url,
        stock:product?.stock,
        quantity
      }
      dispatch(setCartItem(cartItem))
      toast.success('Item Added to cart Successfully!!')
    }
    useEffect(()=>{
        if(isError){
         // console.log(error,"err")
         toast.error(error?.data?.message)
        }
        },[isError])
       

        const increaseQty=()=>{
          //console.log(quantity,'quan');
          if(quantity >=product.stock){
            return
          }
          const qty=quantity+1
          Setquantity(qty)
        }
        const decrementQty=()=>{
         // console.log(quantity,'quan');
          if(quantity <=1){
            return
          }
          const qty=quantity-1
          Setquantity(qty)
        }
        if (isLoading)return <Loader/>
       if(error && error.status===404){
        return <Notfound/>
       }
  return (
    <>
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            src={activeImage}
            alt=""
            width="250"
            height="300"
          />
        </div>
        <div className="row justify-content-start mt-5">
            {product?.images?.map((el,index)=>{
                return(<div className="col-2 ms-4 mt-2" key={index}>
                <Link role="button">
                  <img
                    className={`d-block border rounded p-3 cursor-pointer ${el?.url===activeImage?"border-warning":''}`}
                    height="100"
                    width="100"
                    src={el?.url}
                    alt={el?.url}
                    onClick={(e)=>{SetActiveImg(el?.url)}}
                  />
                </Link>
              </div>)
            })}
          
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">Product # {product?._id}</p>

        <hr />

        <div className="d-flex">
        <StarRatings
          rating={product?.rating}
          starRatedColor="#ffb829"
         starDimension='15px'
         starSpacing='0.5px'
          numberOfStars={5}
          name='rating'
        />
          <span id="no-of-reviews" className="pt-1 ps-2"> ({product?.numberOfReviews} Reviews) </span>
        </div>
        <hr />

        <p id="product_price">${product?.price}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus" onClick={decrementQty}>-</span>
          <input
            type="number"
            className="form-control count d-inline"
            value={quantity}
            onChange={(e)=>Setquantity(e.target.value)}
            readonly
          />
          <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled={product?.stock<=0}
          onClick={handleClick}
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status: <span id="stock_status" className={product?.stock>0 ? `greenColor`:'redColor'}>
            {product?.stock>0 ? `In stocks`:'Out Of Stock'}</span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>
         {product?.description}
        </p>
        <hr />
        <p id="product_seller mb-3">Sold by: <strong>{product?.seller}</strong></p>
{isAuthenticated ? <NewReviews productId={product?._id}/> :<div className="alert alert-danger my-5" type="alert">
          Login to post your review.
        </div>}
  
      </div>
      {product?.reviews?.length>0 && <ListReviews reviews={product?.reviews}/>}  
    </div> 
    
    </>
  )
}

export default ProductDetails