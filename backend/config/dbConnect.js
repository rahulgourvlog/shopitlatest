import express from "express";
import mongoose from "mongoose"

export  const connectDB=()=>{
    let DB_URI="";
    if(process.env.NODE_ENV=='DEVELOPMENT')DB_URI=process.env.DB_LOCAL_URI
    if(process.env.NODE_ENV=="PRODUCTION")DB_URI=process.env.DB_URI
    
    mongoose.connect(DB_URI).then((conn)=>{
        console.log(`mongodb is sucessfully connected to  host ${conn?.connection?.host}`)
    })
}