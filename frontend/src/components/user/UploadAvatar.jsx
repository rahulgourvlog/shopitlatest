import React, { useEffect, useState } from "react";
import { useUploadAvatarMutation } from "../../redux/api/userApi";
import UserLayout from "../layout/UserLayout";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UploadAvatar = () => {
  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();
  const { user } = useSelector((state) => state.auth);
  const [avatar, Setavatar] = useState("");
  const [avatarPreview, SetavatarPreview] = useState(
    user?.avatar?.url ? user?.avatar?.url : "/images/default_avatar.jpg"
  );
  const navigate = useNavigate();
  useEffect(()=>{
   
    if(error){
      toast.error(error?.data?.message)
    }
    if(isSuccess){
      toast.success("upLoaded Sucessfully");
      navigate('/me/profile')
    }
  },[error,isSuccess])
  const handleChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        Setavatar(reader.result);
        SetavatarPreview(reader.result);
        //console.log("finish", reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    //console.log("file", e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(avatar, "avatari");
    const uploaddata = {
      avatar,
    };
    uploadAvatar(uploaddata);
  };
  return (
    <>
      <UserLayout>
        <div className="row wrapper">
          <div className="col-10 col-lg-8">
            <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
              <h2 className="mb-4">Upload Avatar</h2>

              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <figure className="avatar item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="user"
                      />
                    </figure>
                  </div>
                  <div className="input-foam">
                    <label className="form-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                    <input
                      type="file"
                      name="avatar"
                      className="form-control"
                      id="customFile"
                      accept="images/*"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <button
                id="register_button"
                type="submit"
                className="btn w-100 py-2"
                disabled={isLoading}
              >
               {isLoading ? 'Uploading...':'Upload'} 
              </button>
            </form>
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default UploadAvatar;
