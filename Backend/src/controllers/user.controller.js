import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";
import {Company} from "../models/companies.model.js"

// Generate access and refresh tokens and store refresh token in DB
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating access and refresh token");
  }
};

// Register user controller
const registerUser = asyncHandler(async (req, res) => {
  const { collageName, email,  password } = req.body;

  if ([collageName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  const user = await User.create({
    collageName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully","success"));
});

// Login user controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  console.log(loggedInUser)

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  

  return res
    .status(200)
    // .cookie("accessToken", accessToken, options)
    // .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        // loggedInUser,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully",
        "success"
      )
    );
});

// Logout user controller
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const addCompanies = asyncHandler(async (req, res) => {
  const {
    companyName, location, status, industry, visitDate, website,
    description, process, title, department, type,
    experience, ctc, eligibility, deadline, skills
  } = req.body || {};

  console.log("Incoming body:", req.body);
  console.log("Files:", req.files);

  const isEmpty = (field) =>
    field === undefined ||
    field === null ||
    (typeof field === "string" && field.trim() === "") ||
    (Array.isArray(field) && field.length === 0);

  if (
    [companyName, location, status, industry, visitDate, website,
     description, process, title, department, type,
     experience, ctc, eligibility, deadline, skills].some(isEmpty)
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Parse arrays and dates if sent as strings
  const parsedProcess = typeof process === "string" ? process.split(",").map(p => p.trim()) : process;
  const parsedSkills = typeof skills === "string" ? skills.split(",").map(s => s.trim()) : skills;
  const parsedVisitDate = new Date(visitDate);
  const parsedDeadline = new Date(deadline);

  // Logo upload
  const logoLocalPath = req.file?.path;
  if (!logoLocalPath) {
    throw new ApiError(400, "Logo file is required");
  }

  const logo = await uploadOnCloudinary(logoLocalPath);
  if (!logo) {
    throw new ApiError(400, "Failed to upload logo");
  }

  // Create the company
  const company = await Company.create({
    user: req.user._id,
    companyName, location, status, industry,
    visitDate: parsedVisitDate,
    website, description, process: parsedProcess,
    title, department, type,
    experience, ctc, eligibility,
    deadline: parsedDeadline,
    skills: parsedSkills,
    logo: logo.url
  });

  return res.status(201).json(
    new ApiResponse(200, company, "New company registered successfully")
  );
});


export { registerUser, loginUser, logoutUser , addCompanies };
