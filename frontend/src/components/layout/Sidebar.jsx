import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({menuItems}) => {

   
    const location=useLocation()
console.log("location")
    const [activemenuItem,SetactivemenuItem]=useState(location.pathname);
    const handleClick=(url)=>{
        SetactivemenuItem(url)

    }
  return (
   <>
     <div className="list-group mt-5 pl-4">
        {menuItems.map((menuitem,index)=>{
            return(
<Link
key={index}
        to={menuitem.url}
        className={`fw-bold list-group-item list-group-item-action ${activemenuItem.includes(menuitem.url) ? 'active':''}`}
        aria-current={`${activemenuItem.includes(menuitem.url) ? 'true':'false'}`}
        onClick={()=>handleClick(menuitem.url)}
      >
        <i className={`${menuitem.icon} fa-fw pe-2`}></i>{menuitem.name}
      </Link>
            )
        })}
      
      
    </div>
   
   </>
  )
}

export default Sidebar