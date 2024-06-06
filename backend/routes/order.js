import express from "express";
import { deleteOrder, getAllOrderByAdmin, myOrders, newOder, orderDeatails, SalesOrderData, updateOderByAdmin } from "../controller/orderController.js";
import { isAuthenticated, isAuthorised } from "../middleware/auth.js";
const router=express.Router();

router.route("/order/new").post(isAuthenticated,newOder)
router.route("/order/:id").get(isAuthenticated,orderDeatails)
router.route("/me/orders").get(isAuthenticated,myOrders)

router.route("/admin/order").get(isAuthenticated,isAuthorised("admin"),getAllOrderByAdmin)
router.route("/admin/order/:id")
.put(isAuthenticated,isAuthorised("admin"),updateOderByAdmin)
.delete(isAuthenticated,isAuthorised("admin"),deleteOrder)
router.route("/admin/get_sales").get(isAuthenticated,isAuthorised("admin"),SalesOrderData)
export default router