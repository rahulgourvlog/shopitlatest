import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import StarRatings from 'react-star-ratings';
const ProductItem = ({product}) => {
  const [searchParams]=useSearchParams();
  const keyword=searchParams.get('keyword') || ""
  return (
   <>
   <div className={keyword ?"col-sm-12 col-md-6 col-lg-4 my-3":"col-sm-12 col-md-6 col-lg-3 my-3"}>
                <div className="card p-3 rounded">
                  <img
                    className={keyword ?"card-img-bottom mx-auto": "card-img-top mx-auto"}
                    src={product?.images[0]?.url}
                    alt={product?.name}
                  />
                  <div
                    className="card-body ps-3 d-flex justify-content-center flex-column"
                  >
                    <h7 className="card-title">
                      <Link to={`/product/${product?._id}`}>{product?.name}</Link>
                    </h7>
                    <div className="ratings mt-auto d-flex">
                    <StarRatings
          rating={product?.rating}
          starRatedColor="#ffb829"
         starDimension='15px'
         starSpacing='0.5px'
          numberOfStars={5}
          name='rating'
        />
                      <span id="no_of_reviews" className="pt-2 ps-2">{`(${product?.numberOfReviews})`} </span>
                    </div>
                    <p className="card-text mt-2">${product?.price}</p>
                    <Link  to={`/product/${product?._id}`} id={keyword?"view_btn1":"view_btn"} className={'btn btn-block'}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
   </>
  )
}

export default ProductItem