import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";
import { Company } from "../models/companies.model.js";

// Helper to check if a field is empty
const isEmpty = (field) =>
  field === undefined ||
  field === null ||
  (typeof field === "string" && field.trim() === "") ||
  (Array.isArray(field) && field.length === 0);

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
    throw new ApiError(500, "Error generating access and refresh token");
  }
};

// Register user controller
const registerUser = asyncHandler(async (req, res) => {
  const { collageName, email, password } = req.body;

  if ([collageName, email, password].some(isEmpty)) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await User.create({ collageName, email, password });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Error registering user");
  }

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully", "success")
  );
});

// Login user controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (isEmpty(email) || isEmpty(password)) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(
      200,
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
    { $unset: { refreshToken: "" } },
    { new: true }
  );

  return res.status(200).json(new ApiResponse(200, {}, "User logged out"));
});

// Add company controller
const addCompanies = asyncHandler(async (req, res) => {
  const {
    name,
    location,
    status,
    industry,
    visitDate,
    website,
    description,
    process,
    positions,
  } = req.body || {};

  // Debug logs to check incoming data
  console.log("Received company data:", {
    name,
    location,
    status,
    industry,
    visitDate,
    website,
    description,
    process,
    positions,
  });
  console.log("Received file:", req.file);

  // Validate required fields
  if (
    [name, location, status, industry, visitDate, website, description, process, positions].some(isEmpty)
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Parse arrays if sent as JSON strings (frontend might stringify them)
  const parsedProcess = typeof process === "string" ? JSON.parse(process) : process;
  const parsedPositions = typeof positions === "string" ? JSON.parse(positions) : positions;
  const parsedVisitDate = new Date(visitDate);

  // Validate each position in array
  parsedPositions.forEach((pos, idx) => {
    const {
      title,
      department,
      type,
      experience,
      ctc,
      eligibility,
      deadline,
      skills,
    } = pos;

    if (
      [title, department, type, experience, ctc, eligibility, deadline, skills].some(isEmpty)
    ) {
      throw new ApiError(400, `Position at index ${idx} is missing required fields.`);
    }

    // Parse skills if stringified
    if (typeof skills === "string") {
      pos.skills = JSON.parse(skills);
    }

    pos.deadline = new Date(deadline);
    pos.id = `POS${Date.now()}${idx}`;
  });

  // Check for logo file upload
  if (!req.file || !req.file.path) {
    throw new ApiError(400, "Logo file is required");
  }

  // Upload logo to cloudinary
  const logo = await uploadOnCloudinary(req.file.path);
  if (!logo || !logo.url) {
    throw new ApiError(400, "Failed to upload logo");
  }

  // Create company linked to logged-in user (req.user must be set by auth middleware)
  const company = await Company.create({
    user: req.user._id,
    name,
    location,
    status,
    industry,
    visitDate: parsedVisitDate,
    website,
    description,
    process: parsedProcess,
    positions: parsedPositions,
    logo: logo.url,
  });

  return res.status(201).json(
    new ApiResponse(201, company, "New company registered successfully","success")
  );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  addCompanies,
};
