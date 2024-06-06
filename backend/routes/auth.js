import express from "express";
import { LoginUser, deleteUser, forgetPasswordforUser, getUserDetails, getUserProfile, getallUsers, logOutUser, registerUser, resetPasswordforUser, updatePassword, updateProfile, updateUserDetails, uploadAvatar} from "../controller/authController.js";
import { isAuthenticated, isAuthorised } from "../middleware/auth.js";

const Router= express.Router();

Router.route("/register").post(registerUser);
Router.route("/login").post(LoginUser);
Router.route("/logout").get(logOutUser);
Router.route("/forgotPassword").post(forgetPasswordforUser);
Router.route("/password/reset/:token").put(resetPasswordforUser);
Router.route("/me").get(isAuthenticated,getUserProfile);
Router.route("/password/update").put(isAuthenticated,updatePassword);
Router.route("/me/update").put(isAuthenticated,updateProfile);
Router.route("/me/upload_avatar").put(isAuthenticated,uploadAvatar);

//Admin can access
Router.route("/admin/users").get(isAuthenticated,isAuthorised("admin"),getallUsers);

Router
.route("/admin/users/:id")
.get(isAuthenticated,isAuthorised("admin"),getUserDetails)
.put(isAuthenticated,isAuthorised("admin"),updateUserDetails)
.delete(isAuthenticated,isAuthorised("admin"),deleteUser)


export default Router