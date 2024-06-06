import React from 'react'
import StarRatings from 'react-star-ratings'

const ListReviews = ({reviews}) => {
    //console.log('reviews=>>>>',reviews)
  return (
    <>
     <div className="reviews w-75" >
      <h3>Other's Reviews:</h3>
      <hr />
    {reviews.map((review,index)=>{
        return(
            <div className="review-card my-3"  key={index}>
            <div className="row">
              <div className="col-1">
                <img
                  src={review?.user?.avatar?.url ? review?.user?.avatar?.url :"/images/default_avatar.jpg"}
                  alt="User Name"
                  width="50"
                  height="50"
                  className="rounded-circle"
                />
              </div>
              <div className="col-11">
              <StarRatings
              rating={review?.rating}
              starRatedColor="#ffb829"
             starDimension='15px'
             starSpacing='0.5px'
            
              name='rating'
            />
                <p className="review_user">by {review?.user?.name}</p>
                <p className="review_comment">{review?.comments}</p>
              </div>
            </div>
            <hr />
          </div>
    
        )
    })}
   
     
      
    </div>
    </>
  )
}

export default ListReviews