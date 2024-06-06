import express from "express";
import mongoose from "mongoose"
import product from "../model/product.js";
import data from "./data.js"

 const seeder=async(req,res)=>{
    try{
 await mongoose.connect("mongodb+srv://rahulgour9754:F4r6Sep4j1ykPxpb@shopit.j85wkw7.mongodb.net/shopit?retryWrites=true&w=majority&appName=shopIt");
  // delete all products
  await product.deleteMany();
console.log("data",data)
  //insertMany products
  await product.insertMany(data)
  process.exit()
    }catch(err){
        console.log(err)
        process.exit()

    }

}
seeder()


