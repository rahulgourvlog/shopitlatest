import React, { useEffect, useState } from "react";
import { useResetPasswordMutation } from "../../redux/api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, Setpassword] = useState();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [confirmpassword, Setconfirmpassword] = useState();
  const params = useParams();
  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("password Reset Sucessfully");
      navigate('/login')
    }
  }, [isAuthenticated, error, isSuccess]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { password, confirmPassword: confirmpassword };
    console.log("body", body);
    console.log(params, "par");
    if(password!==confirmpassword){
        return toast.error('password does not match pls try again..')
    }
    resetPassword({ token: params?.token, body: body });
  };
  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 className="mb-4">New Password</h2>

            <div className="mb-3">
              <label for="password_field" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => Setpassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label for="confirm_password_field" className="form-label">
                Confirm Password{" "}
              </label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                name="confirm_password"
                value={confirmpassword}
                onChange={(e) => Setconfirmpassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
            {isLoading?'reseting password...':' Set Password'} 
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
