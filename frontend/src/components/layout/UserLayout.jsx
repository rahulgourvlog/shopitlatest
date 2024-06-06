import React from 'react'
import Sidebar from './Sidebar'

const UserLayout = ({children}) => {
  const menuItems=[
    {
        name:'Profile',
        url:'/me/profile',
        icon:'fas fa-user'
    },
    {
        name:'Update Profile',
        url:'/me/update_profile',
        icon:'fas fa-user'
    },
    {
        name:'Upload Avatar',
        url:'/me/upload_avatar',
        icon:'fas fa-user-circle'
    },
    {
        name:'Update Password',
        url:'/me/update_password',
        icon:'fas fa-lock'
    },
        ]
  return (
    <>
    <div className='mb-4 mt-2 py-4'>
        <h2 className='text-center fw-bolder'>User Settings</h2>
    </div>
    <div className='container'>
        <div className='row justify-content-around'>
            <div className='col-12 col-lg-3'> 
           <Sidebar menuItems={menuItems}/>
            </div>
            <div className='col-12 col-lg-8'>
                {children}
            </div>
        </div>
    </div>
    
    </>
  )
}

export default UserLayout