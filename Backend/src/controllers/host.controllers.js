// controllers/host.controller.js
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { Host } from "../models/host.models.js";

// Helper function to generate access and refresh tokens
const generateAccessAndRefreshToken = async (hostId) => {
  try {
    const host = await Host.findById(hostId);
    if (!host) {
      throw new ApiError(404, "Host not found");
    }

    const accessToken = host.generateAccessToken
      ? host.generateAccessToken()
      : "access-token-placeholder";
    const refreshToken = host.generateRefreshToken
      ? host.generateRefreshToken()
      : "refresh-token-placeholder";

    host.refreshToken = refreshToken;
    await host.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating access and refresh token");
  }
};

// Register host controller
const registerHost = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email, and password are required");
  }

  // Check if host with the same email exists
  const existedHost = await Host.findOne({ email });
  if (existedHost) {
    throw new ApiError(409, "Host with this email already exists");
  }

  // Create the host
  const newHost = await Host.create({ name, email, password });

  // Remove sensitive fields
  const createdHost = await Host.findById(newHost._id).select("-password -refreshToken");

  return res.status(201).json(
    new ApiResponse(
      201,
      createdHost,
      "Host registered successfully",
      "success"
    )
  );
});

// Login host controller
const loginHost = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const host = await Host.findOne({ email });
  if (!host) {
    throw new ApiError(404, "Host does not exist");
  }

  const isPasswordValid = await host.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(host._id);
  const loggedInHost = await Host.findById(host._id).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        host: loggedInHost,
        accessToken,
        refreshToken,
      },
      "Host logged in successfully",
      "success"
    )
  );
});

export { registerHost, loginHost };
