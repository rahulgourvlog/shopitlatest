import React from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from '../auth/ProtectedRoute'
import Dashboard from '../admin/Dashboard'
import GetProducts from '../admin/GetProducts'
import NewProducts from '../admin/NewProducts'
import UpdateProduct from '../admin/UpdateProduct'
import UploadProducts from '../admin/UploadProducts'
import ListOrders from '../admin/ListOrders'
import ProcessOrder from '../admin/ProcessOrder'
import ListUsers from '../admin/ListUsers'
import UpdateUsers from '../admin/UpdateUsers'
import ProductReviews from '../admin/ProductReviews'

const adminRoutes = () => {
  return (
    <>
    <Route path="/admin/dashboard" element={
     <ProtectedRoute admin={true}><Dashboard/></ProtectedRoute>}/> 
      <Route path="admin/products" element={
     <ProtectedRoute admin={true}><GetProducts/></ProtectedRoute>}/> 
       <Route path="/admin/product/new" element={
     <ProtectedRoute admin={true}><NewProducts/></ProtectedRoute>}/> 
      <Route path="/admin/products/:id" element={
     <ProtectedRoute admin={true}><UpdateProduct/></ProtectedRoute>}/> 
      <Route path="/admin/product/:id/upload_images" element={
     <ProtectedRoute admin={true}><UploadProducts/></ProtectedRoute>}/> 
       <Route path="admin/orders" element={
     <ProtectedRoute admin={true}><ListOrders/></ProtectedRoute>}/> 
       <Route path="/admin/order/:id" element={
     <ProtectedRoute admin={true}><ProcessOrder/></ProtectedRoute>}/> 
     <Route path="/admin/users" element={
     <ProtectedRoute admin={true}><ListUsers/></ProtectedRoute>}/> 
     <Route path="/admin/users/:id" element={
     <ProtectedRoute admin={true}><UpdateUsers/></ProtectedRoute>}/> 
      <Route path="/admin/reviews" element={
     <ProtectedRoute admin={true}><ProductReviews/></ProtectedRoute>}/> 
    </>
  )
}

export default adminRoutes