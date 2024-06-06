import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, Setpassword] = useState("");
  const {isAuthenticated}=useSelector((state)=>state.auth)
const navigate=useNavigate()
  const [login, { isLoading, error }] = useLoginMutation();

  //---after login in set the user in the state & quickly route to the /api/v1/me  & set the user in profile

  useEffect(() => {
    if(isAuthenticated){
      navigate("/")
    }
    if (error) {
      console.log('err',error)
       toast.error(error?.data?.message);
    }
  }, [error,isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    //console.log("login",loginData)
    login(loginData);
    //console.log("data",data)
  };

  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
           
         
            onSubmit={handleSubmit}
          >
            <h2 className="mb-4">Login</h2>
            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password_field" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => Setpassword(e.target.value)}
              />
            </div>

            <Link to="/password/forgot" className="float-end mb-4">
              Forgot Password?
            </Link>

            <button
              id="login_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "LOGIN"}
            </button>

            <div className="my-3">
              <Link to="/register" className="float-end">
                New User?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
