import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom'
import { useDeleteProductReviewMutation, useLazyGetProductReviewQuery } from '../../redux/api/userApi'
import toast from 'react-hot-toast'
import Loader from '../layout/Loader'

const ProductReviews = () => {
    const [productId,SetproductId]=useState("")
    
const [getProductReview,{data,isLoading,error}]=useLazyGetProductReviewQuery();
    const[deleteProductReview,{isLoading:delLoading,error:errorDelete,isSuccess}]=useDeleteProductReviewMutation()
   //console.log('data=>>>>',data)
   useEffect(()=>{
    if(error){
    
      toast.error(error?.data?.message)
    }
   if(isSuccess){
    toast.success('Review Deleted Successfully !!');

   }

        },[error,isSuccess])

          const handleDelete=(Id)=>{
            deleteProductReview({productId,Id})
          }
        const handleSubmit=(e)=>{
            e.preventDefault();
            console.log(productId,"productId=>>>")
            getProductReview(productId)
                }
       
          if (isLoading) return <Loader/>
    const setReviews=()=>{
  let Reviews={
    columns:[
      {
        label: 'Review ID',
        field: 'id',
        sort: 'asc'
       
      },
      {
        label: 'Rating',
        field: 'rating',
        sort: 'asc'
       
      },
      {
        label: 'Comment',
        field: 'comment',
        sort: 'asc'
       
      },
      {
        label: 'User',
        field: 'user',
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

 
  data?.review?.forEach((review)=>{
    
    Reviews.rows.push({
        id:review?._id,
    rating:review?.rating,
    comment:review?.comments,
    user:review?.user?.name,
      


     
      actions:(
        <>
      
      
        <button  className='btn btn-outline-danger ms-2' 
         onClick={()=>{handleDelete(review?._id)}} 
         disabled={delLoading}
        >
          <i className='fa fa-trash'></i>
        </button>
        </>
      )
  
  
  
  
    })
  })
  return Reviews
    }
  return (
   <>
   <AdminLayout>
   <div className="row justify-content-center my-5">
      <div className="col-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="productId_field" className="form-label">
              Enter Product ID
            </label>
            <input
              type="text"
              id="productId_field"
              className="form-control"
              value={productId}
              onChange={(e)=>{SetproductId(e.target.value)}}
            />
          </div>

          <button
            id="search_button"
            type="submit"
            className="btn btn-primary w-100 py-2"
          >
            SEARCH
          </button>
        </form>
      </div>
    </div>
{data?.review?.length>0 ? ( <MDBDataTable data={setReviews()} className='px-3' bordered striped hover />):
(<p className='mt-5 text-center'>no reviews</p>)}
   
    </AdminLayout>
   </>
  )
}

export default ProductReviews