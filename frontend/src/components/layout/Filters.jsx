import React, { useEffect, useState } from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
import GetPriceByFilter from '../../helper/GetPriceByFilter'
import { FILTER_CATEGORY } from '../../contants/constant'
import StarRatings from 'react-star-ratings'

const Filters = () => {
    const [min,SetMin]=useState(0)
    const [max,SetMax]=useState(0)
    let [searchParams]=useSearchParams();
  const navigate=useNavigate()

useEffect(()=>{
searchParams.has("min") && (SetMin(searchParams.get("min")))
searchParams.has("max") && (SetMax(searchParams.get("max")))
},[])


//handleClick for category
const handleClick=(checkbox)=>{
   
  const checkboxes=document.getElementsByName(checkbox.name);
  checkboxes.forEach((item)=>{
   if(item!==checkbox) {
    item.checked=false
   } 
  })
   if(checkbox.checked==false){
if(searchParams.has(checkbox.name)){
  // if unchecked & value is there in params then delete that value

  searchParams.delete(checkbox.name)
}
const url=window.location.pathname+"?"+searchParams;
navigate(url)
   }
   else{
   
    if(searchParams.has(checkbox.name)){
 // if value already there in params then update the value
 searchParams.set(checkbox.name,checkbox.value) 
   }
   else{
    // if value in present in params then append in the params
    searchParams.append(checkbox.name,checkbox.value)
   }
   const url=window.location.pathname+"?"+searchParams;
navigate(url)
  }
}




  //handleSubmit for filters
    const handleSubmit=(e)=>{
        e.preventDefault();
       
     searchParams=GetPriceByFilter(searchParams,"min",min)
     searchParams=GetPriceByFilter(searchParams,"max",max)
//console.log(searchParams,"minmax")
const path=window.location.pathname+"?"+searchParams;

navigate(path)
    }

    //default Checked--> checkbox function 
    const handleChecked=(checkboxType,checkboxvalue)=>{
const value=searchParams.get(checkboxType);
if(value===checkboxvalue){
  return true 
}
return false
    }
  return (
    <>
      <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form
        id="filter_form"
       
        onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min($)"
              name="min"
              value={min}
              onChange={(e)=>SetMin(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max($)"
              name="max"
              value={max}
              onChange={(e)=>SetMax(e.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">GO</button>
          </div>
        </div>
      </form>
      <hr />
      <h5 className="mb-3">Category</h5>
      {FILTER_CATEGORY.map((category)=>{
        return(
<div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="category"
          id="check4"
          defaultChecked={handleChecked("category",category)}
          value={category}
          onClick={(e)=>handleClick(e.target)}
        />
        <label className="form-check-label" for="check4"> {category} </label>
      </div>
        )
      })}

      
      

      <hr />
      <h5 className="mb-3">Ratings</h5>
{[5,4,3,2,1].map((rating)=>{
  return ( <div className="form-check">
  <input
    className="form-check-input"
    type="checkbox"
    name="rating"
    id="check7"
    value={rating}
    defaultChecked={handleChecked("rating",rating.toString())}
    onClick={(e)=>handleClick(e.target)}
  />
  <label className="form-check-label" for="check7">
  <StarRatings
          rating={rating}
          starRatedColor="#ffb829"
         starDimension='15px'
         starSpacing='0.5px'
          numberOfStars={5}
          name='rating'
        />
  </label>
</div>)
})}
     
     
    </div>
    
    </>
  )
}

export default Filters