// we put main logic inside controller

import catchAsyncError from "../middleware/catchAsyncError.js";
import product from "../model/product.js";
import Order from "../model/order.js"
import ApiFilters from "../utils/apifilter.js";
import ErrorHandler from "../utils/errorHandler.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";


//for get products(/api/v1/products)
export const getProduct = catchAsyncError(async (req, res,next ) => {
  console.log(req.query)
  const apifilter = new ApiFilters(product, req.query).search().filter();
  //console.log(apifilter);
  let resPerPage = 4;
  let products = await apifilter.query;
  let filterProductLength = products.length;

//   pagination 
  apifilter.pagination(resPerPage);
  products = await apifilter.query.clone();
  //const products = await product.find();
  res.status(200).json({
    message: "all products",
    filterProductLength,
    resPerPage,
    products,
  });
});

//for create new products(/api/v1/admin/products)
export const createProduct = catchAsyncError(async (req, res) => {
  req.body.user=req.user._id
  console.log("user",req.body.user)
  const products = await product.create(req.body);
 
  res.status(200).json({
    message: "product Created",
    products,
  });
});

//for productDetails(/api/v1/products/:id)
// next will call next stack middleware in the express in next we are calling the instance of calss
export const productDetails = catchAsyncError(async (req, res, next) => {
  console.log("params", req?.params?.id);
  //    operator chaining--> req?.params?.id
  const products = await product.findById(req?.params?.id).populate('reviews.user');
  if (!products) {
    // return res.status(400).json({
    //     message:'product not found'
    // })
    return next(new ErrorHandler("product not found", 400));
  }
  res.status(200).json({
    message: "products details",
    products,
  });
});

//product update(/api/v1/products:id)
export const updateProduct = catchAsyncError(async (req, res,next) => {
  let products = await product.findById(req?.params?.id);
  if (!products) {
    // return res.status(400).json({
    //     mesaage:"product not found"
    // })
    return next(new ErrorHandler("product not found", 400));
  }

  //new true return the complete document
  products = await product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });
  console.log(products);
  res.status(200).json({
    message: "product updated!!",
    products,
  });
});

//delete the product (/api/v1/admin/product/:id)

export const deleteProduct = catchAsyncError(async (req, res) => {
  const products = await product.findById(req?.params?.id);

  if (!products) {
    
    return next(new ErrorHandler("product not found", 400));
  }

  //deleting the images associated with that products
  for(let i=0;i<products.images?.length;i++){
await delete_file(products?.images[i].public_id)
  }
  await product.deleteOne();

  res.status(200).json({
    message: "product deleted",
  });
});


//create and update the review 

export const createProductReview=catchAsyncError(async(req,res,next)=>{
const {rating,comment,productId}=req.body
//console.log(rating,comment,productId)
const review={
  user:req.user._id,
  rating:Number(rating),
  comments:comment
}

let products=await product.findById(productId)
//console.log("prde",products)
if(!products){
  return next( new ErrorHandler("product not found with this Id",400))
}
//to find wheather user has already given review or not
const isReview=products.reviews.find((items)=>{
  return(items.user.toString()==req.user._id.toString())}
)


if(isReview){
 
products.reviews.forEach((r)=>{
  if(r.user.toString()===req.user._id.toString()){
    r.rating=rating,
    r.comments=comment
  }
  
})
}
else{
  products.reviews.push(review)
  products.numberOfReviews=products.reviews.length

}


products.rating=products.reviews.reduce((acc,item)=>item.rating+acc,0)/products.reviews.length
console.log(products.rating,"rating")
await products.save({validateBeforeSave:false})





res.status(200).json({
  sucess:true
})
})


export const getProductReviews=catchAsyncError(async(req,res,next)=>{
const products=await product.findById(req.query.id).populate('reviews.user');
if(!products){
  next(new ErrorHandler("product not found with this Id",400))
}
res.status(200).json({
  review:products.reviews

})
})


//admin route 
export const deleteProductReview=catchAsyncError(async(req,res,next)=>{
const products=await product.findById(req.query.productId);
if(!products){
  next(new ErrorHandler("product not found with this productId",400))
}
let reviews=products.reviews.filter((review)=>review._id.toString()!=req ?.query?.Id.toString());

const numberOfReviews=reviews.length;

const rating=numberOfReviews==0 ? 0: products.reviews.reduce((acc,item)=>item.rating+acc,0)/numberOfReviews;

products=await product.findByIdAndUpdate(req.query.productId, {reviews, numberOfReviews ,rating},{new:true});

res.status(200).json({
  success:true,
  products
})

})


// user can review 

 export const UserCanReview=catchAsyncError(async(req,res,next)=>{
  //console.log('canReview->>>>>',req.query)
  const order=await Order.find({
    user:req.user._id,
    'orderItems.product':req.query.productId
  })
 // console.log(order,"order=>>>")
  if(order.length==0){
    return res.status(200).json({canReview:false})
  }

  res.status(200).json({
    canReview:true
  })
})


export const getAdminProduct=catchAsyncError(async(req,res,next)=>{
  const products=await product.find();
  if(!products){
    next(new ErrorHandler("product not found",400))
  }
  res.status(200).json({
    products
  
  })
  })

  export const uploadProductImages=catchAsyncError(async(req,res,next)=>{
const products=await product.findById(req?.params?.id);

if(!products){
  next(new ErrorHandler("product not found",400))
}


const uploader=async(image)=>await upload_file(image,"shopIt/products");

const urls=await Promise.all((req?.body?.images).map(uploader))

products?.images?.push(...urls)
await products.save({validateBeforeSave:false})
res.status(200).json({
  products
})

  })


  export const DeleteUpload=catchAsyncError(async(req,res,next)=>{

    const products=await product.findById(req?.params?.id);
    if(!products){
      next(new ErrorHandler("product not found",400))
    }

    const deletefile=await delete_file(req?.body?.imgId);
    //console.log("img=>>>",req?.body?.imgId)

if(deletefile){

  products.images=products?.images?.filter((img)=>img.public_id!==req.body?.imgId);
  await products.save()
}

res.status(200).json({
  products
})
  })
  