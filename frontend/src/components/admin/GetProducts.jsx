import React, { useEffect } from 'react'
import { useDeleteProductMutation, useGetAdminProductsQuery } from '../../redux/api/productsApi'

import {MDBDataTable} from "mdbreact"

import {toast} from "react-hot-toast";
import Loader from "../layout/Loader"
import { Link } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';


const GetProducts = () => {
    const {data,isLoading,error}=useGetAdminProductsQuery();
    const[deleteProduct,{isLoading:deleteLoading,error:deleteError,isSuccess:deleteSuccess}]=useDeleteProductMutation()
   console.log("data=>>>>",data)
    useEffect(()=>{
      if(error){
        //console.log('errr',error)
        toast.error(error?.data?.message)
      }
   if(deleteError){
    toast.error(error?.data?.message)
   }
    if(deleteSuccess){
      toast.success('deleted Sucessfully !!')
    }  
          },[error,deleteError,deleteSuccess])
          if (isLoading) return <Loader/>
    const setProducts=()=>{
  let products={
    columns:[
      {
        label: 'ID',
        field: 'id',
        sort: 'asc'
       
      },
      {
        label: 'Name',
        field: 'name',
        sort: 'asc'
       
      },
      {
        label: 'Stock',
        field: 'stock',
        sort: 'asc'
       
      },
      
      {
        label: 'Actions',
        field: 'actions',
        sort: 'asc'
       
      }
      
    ],
    rows:[
  
    ],
   
  }

  const handleDelete=(id)=>{
    deleteProduct(id)
  }
  data?.products?.forEach((product)=>{
    
    products.rows.push({
      id:product?._id,
      name:`${product?.name.substring(0,20)}...`,
      stock:product?.stock,
     
      actions:(
        <>
        <Link to={`/admin/products/${product?._id}`} className='btn btn-outline-primary'>
          <i className='fa fa-pencil'></i>
        </Link>
        <Link to={`/admin/product/${product?._id}/upload_images`} className='btn btn-outline-success ms-2'>
          <i className='fa fa-image'></i>
        </Link>
        <button  className='btn btn-outline-danger ms-2' disabled={deleteLoading} onClick={()=>handleDelete(product?._id)}>
          <i className='fa fa-trash'></i>
        </button>
        </>
      )
  
  
  
  
    })
  })
  return products
    }
    return (
      <>
      <AdminLayout>
        <h1 className='my-5'>{data?.products?.length} Products</h1>
        <MDBDataTable data={setProducts()} className='px-3' bordered striped hover />
      </AdminLayout>
      </>
    )
  }
  
  export default  GetProducts 
