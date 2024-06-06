import express from "express";
import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    maxLength: [200, "product length cannot exceed 200 character"]
  },
  price: {
    type: Number,
    required: [true, "please enter the product price"],
    maxLength: [5, "product price cannot exceed 5 digit"]
  },
  description: {
    type: String,
    required: [true, "please enter the product description"]
  },
  rating: {
    type: Number,
    default: 0
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category:{
    type:String,
   enum:{
    values:[
        "Electronics","Home","Outdoor","Sports","Laptops","Accessories","Books","Food","Headphones","Cameras"
    ],
    message:"please enter the category"
  }
  }, seller: {
    type: String,
    required: [true, "please enter the product Seller"]
  },
  stock:{
    type:Number,
    required:[true,"please enter the product stock"]
  },
  numberOfReviews:{
    type:Number,
    default:0
  },
  reviews:[
    {  
        //how to take the reference --> objectId from other collection
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true

        },
        rating:{
            type:Number,
            required:true
        },
        comments:{
            type:String,
            required:true
        },
    }
  ],
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:false

},


},{timestamps:true});


export default model("Products",productSchema);