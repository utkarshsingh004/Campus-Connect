// app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("Public"));
app.use(cookieParser());

// Import and use router

import userRouter from './routes/user.routes.js';

app.use("/api/v1/users", userRouter);
console.log("User router mounted");
 // ✅ Correct mounting

export default app;
