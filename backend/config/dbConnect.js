import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();
export  const connectDB=()=>{
    let DB_URI="";
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        DB_URI = process.env.DB_LOCAL_URI;
    } else if (process.env.NODE_ENV === "PRODUCTION") {
        DB_URI = process.env.DB_URI;
    } else {
        console.error("NODE_ENV is not set correctly");
        process.exit(1);
    }
    
    if (!DB_URI) {
        console.error("Database URI is not set");
        process.exit(1);
    }
    
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then((conn) => {
        console.log(`MongoDB successfully connected to host ${conn.connection.host}`);
    })
    .catch((err) => {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    });
}