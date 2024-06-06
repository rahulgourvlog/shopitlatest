import React, { useEffect, useState } from "react";
import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";

const Header = () => {
 
  const { user } = useSelector((state) => state.auth);
  console.log('user=>>>>>',user)
  const {cartItems}=useSelector((state)=>state.cart)
   const { data,isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();
  const navigate = useNavigate();
const[username,setUser]=useState()
  const logoutHandler = () => {
    
    logout();
    window.location.href("/")
  };
 
  useEffect(()=>{
if(user){
  setUser(user?.name)
}
  },[user])

  console.log("user", user);
  return (
    <div className="navbarfixing">
      <nav className="navbar row">
        <div className="col-12 col-md-3 ps-5">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/shopit_logo.png" alt="ShopIT Logo" />
            </Link>
          </div>
        </div>
        <div className="col-8 col-md-5">
          <Search />
        </div>
        <div className="col-12 col-md-4 mt-4 mt-md-0 ">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ms-3">
              {" "}
              Cart{" "}
            </span>
            <span className="ms-1" id="cart_count">
            {cartItems.length}
            </span>
          </Link>
          {user ? (
            <div className="ms-4 dropdown">
              <button
                className="btn dropdown-toggle text-white"
                type="button"
                id="dropDownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={
                      user?.avatar?.url
                        ? user?.avatar?.url
                        : "/images/default_avatar.jpg"
                    }
                    alt="User"
                    className="rounded-circle"
                  />
                </figure>
                <span>{username}</span>
              </button>
              <div
                className="dropdown-menu w-100"
                aria-labelledby="dropDownMenuButton"
              >
                {user.role==='admin' && (<Link className="dropdown-item" to="/admin/dashboard">
                  {" "}
                  Dashboard{" "}
                </Link>)}
                

                <Link className="dropdown-item" to="/me/orders">
                  {" "}
                  Orders{" "}
                </Link>

                <Link className="dropdown-item" to="/me/profile">
                  {" "}
                  Profile{" "}
                </Link>

                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  {" "}
                  Logout{" "}
                </Link>
              </div>
            </div>
          ) : (
           !isLoading && (
              <Link to="/login" className="btn ms-4" id="login_btn">
                {" "}
                Login{" "}
              </Link>
            )
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
