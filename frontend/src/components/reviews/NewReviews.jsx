import React, { useEffect, useState } from 'react'
import StarRatings from 'react-star-ratings'
import { useSubmitReviewMutation } from '../../redux/api/productsApi';
import toast from 'react-hot-toast';
import { useCanReviewQuery } from '../../redux/api/productsApi';
const NewReviews = ({productId}) => {
    const [rating,Setrating]=useState();
    const [comment ,Setcomment]=useState();
    const[submitReview,{isLoading,error,isSuccess}]=useSubmitReviewMutation();
    //console.log("productId",productId)
    const {data}=useCanReviewQuery(productId);
    //console.log("canReview=>>>>",data?.canReview)
    const handleClick=()=>{
        //console.log(rating,comment,'ratingC=>>>>>>');
        const submitData={
            rating,comment,productId
        }
        submitReview(submitData)
    }
    useEffect(()=>{
        if(error){
         // console.log(error,"err")
         toast.error(error?.data?.message)
        }
        },[error])
  return (
   <>
   {data?.canReview && ( <div>
      <button
        id="review_btn"
        type="button"
        className="btn btn-primary mt-4"
        data-bs-toggle="modal"
        data-bs-target="#ratingModal"
      >
        Submit Your Review
      </button>

      <div className="row mt-2 mb-5">
        <div className="rating w-50">
          <div
            className="modal fade"
            id="ratingModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="ratingModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ratingModalLabel">
                    Submit Review
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                <StarRatings
           rating={rating}
          starRatedColor="#ffb829"
         starDimension='30px'
         starSpacing='1px'
         changeRating={(rating)=>Setrating(rating)}
          name='rating'
        />

                  <textarea
                    name="comment"
                    id="review"
                    className="form-control mt-4"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e)=>Setcomment(e.target.value)}
                  ></textarea>

                  <button
                    id="new_review_btn"
                    className="btn w-100 my-4 px-4"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleClick}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)}
   
   
   </>
  )
}

export default NewReviews