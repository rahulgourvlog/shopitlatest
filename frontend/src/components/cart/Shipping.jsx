import React, { useEffect, useState } from 'react'
import { countries } from 'countries-list'
import { useDispatch, useSelector } from 'react-redux';
import { setShippingInfo } from '../../redux/feactures/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from './CheckOutSteps';
const Shipping = () => {
const dispatch=useDispatch()
const navigate=useNavigate()
    //const [shipping,SetShipping]=useState({});
const [address,Setaddress]=useState('')
const [city,Setcity]=useState('')
const [phoneNo,SetphoneNo]=useState('')
const [zipCode,Setzipcode]=useState('')
const [country,Setcountry]=useState('')
   //console.log(countries,'con')
   const {shippingInfo}=useSelector((state)=>state.cart)


   useEffect(()=>{
   Setaddress(shippingInfo?.address)
   Setcity(shippingInfo?.city)
   SetphoneNo(shippingInfo?.phoneNo)
   Setzipcode(shippingInfo?.zipCode)
   Setcountry(shippingInfo?.country)
       },[shippingInfo])
   console.log(shippingInfo,'shipping')
   
  
  const countryList= Object.values(countries);
//   console.log(countryList,'list')
    
    const handleSubmit=(e)=>{
        e.preventDefault();
       console.log('sdf',{address,city,phoneNo,zipCode,country})
        dispatch(setShippingInfo({address,city,phoneNo,zipCode,country}))
        navigate('/confirm_order')
    }
    const handleroute=()=>{
     //

    }
  return (
    <>
     <CheckOutSteps shipping/>
     <div className="row wrapper mb-5">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={handleSubmit}
         
        >
          <h2 className="mb-4">Shipping Info</h2>
          <div className="mb-3">
            <label htmlFor="address_field" className="form-label">Address</label>
            <input
              type="text"
              id="address_field"
              className="form-control"
              name="address"
              value={address}
           onChange={(e)=>Setaddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="city_field" className="form-label">City</label>
            <input
              type="text"
              id="city_field"
              className="form-control"
              name="city"
              value={city}
              onChange={(e)=>Setcity(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone_field" className="form-label">Phone No</label>
            <input
              type="tel"
              id="phone_field"
              className="form-control"
              name="phoneNo"
              value={phoneNo}
              onChange={(e)=>SetphoneNo(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="postal_code_field" className="form-label"
              >Zip Code</label>
            <input
              type="number"
              id="postal_code_field"
              className="form-control"
              name="zipCode"
              value={zipCode}
              onChange={(e)=>Setzipcode(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="country_field" className="form-label">Country</label>
            <select
              id="country_field"
              className="form-select"
              name="country"
              onChange={(e)=>Setcountry(e.target.value)}
              value={country}
              required
            >
              {/* <!-- Replace this with your actual list of countries --> */}
              {countryList.map((country,index)=>{
                return (
 <option key={index} value={country?.name}>{country?.name}</option>
                )
              })}
             
             
           
            </select>
          </div>

          <button id="shipping_btn" type="submit" className="btn w-100 py-2" onClick={handleroute}>
            CONTINUE
          </button>
        </form>
      </div>
    </div>
 
    
    
    </>
  )
}

export default Shipping