import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteProductReview,
  DeleteUpload,
  getAdminProduct,
  getProduct,
  getProductReviews,
  productDetails,
  updateProduct,
  uploadProductImages,
  UserCanReview,
} from "../controller/productController.js";
import { isAuthenticated, isAuthorised } from "../middleware/auth.js";
const Router = express.Router();
//first we will check user is authenticated or not then we will check the
//user is authorised for particular roles he can only access the particular route
//suppose creating the product can be done by admin role only
Router.route("/products").get(getProduct);
Router.route("/admin/products")
  .post(isAuthenticated, isAuthorised("admin"), createProduct)
  .get(isAuthenticated, isAuthorised("admin"), getAdminProduct);
Router.route("/products/:id").get(productDetails);
Router.route("/admin/products/:id").put(
  isAuthenticated,
  isAuthorised("admin"),
  updateProduct
);
Router.route("/products/:id").delete(deleteProduct);
Router.route("/review")
  .put(isAuthenticated, createProductReview)
  .get(isAuthenticated, getProductReviews);

Router.route("/admin/review").delete(
  isAuthenticated,
  isAuthorised("admin"),
  deleteProductReview
);

Router.route("/admin/products/:id/upload_images")
  .put(isAuthenticated, isAuthorised("admin"), uploadProductImages)

  Router.route("/admin/products/:id/delete_image")
  .put(isAuthenticated, isAuthorised("admin"), DeleteUpload)
Router.route("/canreview").get(isAuthenticated, UserCanReview);

Router.route("/admin/product/:id").delete(isAuthenticated,isAuthorised('admin'),deleteProduct)
export default Router;
