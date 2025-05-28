// import ApiError from "../utils/apiError.js";
// import asyncHandler from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.models.js";
// import { Host } from "../models/host.models.js";

// export const verifyJWT = asyncHandler(async (req, _, next) => {
//   try {
//     const authHeader = req.header("Authorization");
//     const token =
//       req.cookies?.accessToken ||
//       (authHeader && authHeader.startsWith("Bearer ")
//         ? authHeader.replace("Bearer ", "").trim()
//         : null);

//     if (!token) {
//       throw new ApiError(401, "Unauthorized request: No token provided");
//     }

//     const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     console.log("Decoded JWT:", decodeToken);

//     const user = await User.findById(decodeToken?._id).select(
//       "-password -refreshToken"
//     );
//     if (!user) {
//       throw new ApiError(401, "Invalid Access Token: User not found");
//     }

//     req.user = user;
//     console.log("✅ JWT Verified (user):", user);
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       console.warn("⚠️ Access token expired:", error.expiredAt);
//       throw new ApiError(401, "Access token expired. Please refresh it.",error.expiredAt);
//     }

//     console.error("❌ JWT verification error:", error.message);
//     throw new ApiError(401, error?.message || "Invalid access token");
//   }
// });

// export const verifyHostJWT = asyncHandler(async (req, _, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer", "").trim();

//     if (!token) {
//       throw new ApiError(401, "Unauthorized request: No token provided");
//     }

//     // decode and verify token
//     const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     // check if host exists
//     const host = await Host.findById(decodeToken?._id).select(
//       "-password -refreshToken"
//     );
//     if (!host) {
//       throw new ApiError(401, "Invalid Access Token: Host not found");
//     }

//     req.host = host;
//     console.log("✅ JWT Verified (host):", host);
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       console.warn("⚠️ Access token expired:", error.expiredAt);
//       throw new ApiError(401, "Access token expired. Please refresh it.");
//     }

//     console.error("❌ JWT verification error:", error.message);
//     throw new ApiError(401, error?.message || "Invalid access token");
//   } 
// });

import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { Host } from "../models/host.models.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "").trim();

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // decode and verify token
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded user token:", decodeToken);

    // check if user exists
    const user = await User.findById(decodeToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    console.log("✅ JWT Verified (user):", user);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token expired. Please refresh it.");
    }
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const verifyHostJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "").trim();

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // decode and verify token
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded host token:", decodeToken);

    // check if host exists
    const host = await Host.findById(decodeToken?._id).select(
      "-password -refreshToken"
    );
    if (!host) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.host = host;
    console.log("✅ JWT Verified (host):", host);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token expired. Please refresh it.");
    }
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

