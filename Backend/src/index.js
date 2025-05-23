// import mongoose from "mongoose";
// import express from "express";
// import { DB_NAME } from "./constants.js";

// const app = express();

// ;(async()=>{
//    try {
//      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//      app.on("error",(e)=>{
//        console.log("Error: ",e);
//        throw e
//      })

//      app.get('/u',(req,res)=>{
//         res.send("hi")
//      })

//      app.listen(process.env.PORT, ()=>{
//         console.log(`App is listening on port ${process.env.PORT}`);
        
//      })

//    } catch (error) {
//     console.log(error);
//     throw err
//    }
// })()

// require('dotenv').config({path:'./env'})

import dotenv from 'dotenv';
import connectDB from "./DB/index.js";
import app from './app.js';

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.on("error",(e)=>{
        console.log("Error: ",e);
        throw e
    })
    
    // app.get('/u',(req,res)=>{
    //     console.log("Get is used")
    //             res.send("hi")
    //          })
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
        
    })
})
.catch((e)=>{
    console.log("Mongo db connection failed !!! ",e)
})

