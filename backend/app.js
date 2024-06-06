import dotenv from "dotenv"
import express from "express";
import productRouter from "./routes/products.js";
import authRouter from "./routes/auth.js";
import paymentRouter from "./routes/payment.js"
import { connectDB } from "./config/dbConnect.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from "url";
import orderRoutes from "./routes/order.js"
//import bodyParser  from "body-parser"
/*
Let's say a user makes a request to your server, triggering a series of operations in your code.
Unexpectedly, an error occurs due to a bug, and your code doesn't have a specific mechanism to handle it.
 Without the event listener for "uncaughtException," this unhandled exception would cause your server to crash abruptly.
*/
;

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename)
process.on("uncaughtException",(err)=>{
    console.log(`error ${err}`)
    console.log(`shutting down the server due to unCaught Exception`)
    process.exit(1)
})
  /*
  In the above code example, the purpose of the code is to provide a safety net for unhandled exceptions. 
  Instead of letting the server crash without any notice, the event listener allows you to log information about the error before gracefully shutting down the server.
  This logging can be crucial for debugging and identifying issues, and the server exit with a specific code helps signal that an error occurred.
    It's a way to make your application more robust by handling unforeseen errors in a controlled manner.
  */

const app=express();
app.use(express.urlencoded({extended:true}))
const cors = require('cors');

/*
app. use(express. json()) is a middleware function that is used to parse JSON data sent in the request body. 
It allows your Express application to handle JSON-encoded data
*/



app.use(express.json({ limit: '10mb' ,verify:(req,res,buf)=>req.rawBody=buf.toString()}))
app.use(cookieParser())

app.use(cors({
  origin: 'https://shopitlatest.netlify.app' 
}));
//app.use(bodyParser.json({ limit: '50mb' }));
dotenv.config({path:'./backend/config/config.env'})

//connecting to the database
connectDB()

//import all Routes
app.use("/api/v1",productRouter);
app.use("/api/v1",authRouter);
app.use("/api/v1", orderRoutes);
app.use('/api/v1',paymentRouter);

// if(process.env.NODE_ENV==='PRODUCTION'){
//    // Serve static files from the build directory
//   app.use(express.static(path.join(__dirname,'../frontend/build')))
//    // Route handler for all other routes
//   app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
//   })
// }
const PORT=process.env.PORT
// call error errorMiddleware 
app.use(errorMiddleware)

const server=app.listen(4000,async()=>{
    console.log(`listening on the port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Handle Unhandled Promise Rejections
/*
An "Unhandled Promise Rejection" in Node.js occurs 
when a Promise is rejected, 
but there is no corresponding catch handler or await statement to handle the rejection.
*/
// handle unhandled promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`ERROR:${err}`)
    console.log(`Shutting the Server due to Unhandled error Rejection`)
    server.close(()=>{
        process.exit(1)
    })
})



/*
Server Closure and Process Exit:
server.close(() => { process.exit(1); });:
 This part attempts to close the server gracefully.
 Once the server is closed, it calls process.exit(1); 
 to terminate the Node.js process with an exit code of 1.
  An exit code of 1 typically signifies an abnormal termination due to an error.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
The process.on function in Node.js is used to set up event listeners 
for specific events that occur during the execution of a Node.js process.
 It allows you to register callback functions that will be executed when a particular event occurs.

The general syntax for process.on is as follows:

process.on(event, callback);
event: A string representing the name of the event for which you want to set up a listener.
callback: A function to be executed when the specified event occurs.
In the context of error handling, as in your previous examples:

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

*/
