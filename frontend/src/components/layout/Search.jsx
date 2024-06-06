import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
const Search = () => {
    const navigate=useNavigate()
    const [keyword,SetKeyword]=useState("")
    const HandleSubmit=(e)=>{
        e.preventDefault()
        console.log(keyword,"keyword")
        if(keyword?.trim()){
            navigate(`/?keyword=${keyword}`)
        }
        else{
            navigate("/")
        }

    }
  return (
   <>
    <form onSubmit={HandleSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              aria-describedby="search_btn"
              className="form-control"
              placeholder="Enter Product Name ..."
              name="keyword"
              value={keyword}
              onChange={(e)=>{SetKeyword(e.target.value)}}
            />
            <button id="search_btn" className="btn" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>
   
   </>
  )
}

export default Search