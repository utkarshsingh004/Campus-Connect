// import asyncHandler from "../utils/asyncHandler.js";
// import ApiError from "../utils/apiError.js";
// import { User } from "../models/user.models.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import ApiResponse from "../utils/apiResponse.js";
// import { Company } from "../models/companies.model.js";
// import CollegeContact from "../models/collegeRegistrationQuery.models.js";

// // Helper to check if a field is empty
// const isEmpty = (field) =>
//   field === undefined ||
//   field === null ||
//   (typeof field === "string" && field.trim() === "") ||
//   (Array.isArray(field) && field.length === 0);

// // Generate access and refresh tokens and store refresh token in DB
// const generateAccessAndRefreshToken = async (userId) => {
//   try {
//     const user = await User.findById(userId);
//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshToken();

//     user.refreshToken = refreshToken;
//     await user.save({ validateBeforeSave: false });

//     return { accessToken, refreshToken };
//   } catch (error) {
//     throw new ApiError(500, "Error generating access and refresh token");
//   }
// };

// // Register user controller
// const registerUser = asyncHandler(async (req, res) => {
//   const { collageName, email, password } = req.body;

//   if ([collageName, email, password].some(isEmpty)) {
//     throw new ApiError(400, "All fields are required");
//   }

//   const existedUser = await User.findOne({ email });
//   if (existedUser) {
//     throw new ApiError(409, "User with this email already exists");
//   }

//   const collageDatabaseUser = await CollegeContact.findOne({email})

//   if(collageDatabaseUser){
//    await collageDatabaseUser.deleteOne({email})
//   }

//   const user = await User.create({ collageName, email, password });
//   const createdUser = await User.findById(user._id).select("-password -refreshToken");

//   if (!createdUser) {
//     throw new ApiError(500, "Error registering user");
//   }

//   return res.status(201).json(
//     new ApiResponse(201, createdUser, "User registered successfully", "success")
//   );
// });

// const registerCollege = asyncHandler(async (req, res) => {
//   const {
//     collegeName,
//     email,
//     contactNumber,
//     role,
//     address,
//     notes,
//   } = req.body;

//   // Validate required fields
//   if ([collegeName, email].some(isEmpty)) {
//     throw new ApiError(400, "College Name and Email are required");
//   }

//   // Optional: Check if the college with the same email already exists
//   const existingCollege = await CollegeContact.findOne({ email });
//   if (existingCollege) {
//     throw new ApiError(409, "College with this email already registered");
//   }

//   // Create the college contact entry
//   const college = await CollegeContact.create({
//     collegeName,
//     email,
//     contactNumber,
//     role,
//     address,
//     notes,
//   });

//   if (!college) {
//     throw new ApiError(500, "Error registering college");
//   }

//   const createdCollege = await CollegeContact.findById(college._id).select('-__v');

//   return res.status(201).json(
//     new ApiResponse(201, createdCollege, "College registered successfully. Please check your email", "success")
//   );
// });

// // Login user controller
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   if (isEmpty(email) || isEmpty(password)) {
//     throw new ApiError(400, "Email and password are required");
//   }

//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new ApiError(404, "User does not exist");
//   }

//   const isPasswordValid = await user.isPasswordCorrect(password);
//   if (!isPasswordValid) {
//     throw new ApiError(401, "Invalid credentials");
//   }

//   const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

//   const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

//   const options = {
//     httpOnly: true,
//     secure: true,
//     sameSite: "None",
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//   };

//   return res
//     .status(200)
//     .cookie("accessToken", accessToken, options)
//     .cookie("refreshToken", refreshToken, options)
//     .json(
//       new ApiResponse(
//         200,
//         {
//           user: loggedInUser,
//           accessToken,
//           refreshToken,
//         },
//         "User logged in successfully",
//         "success"
//       )
//     );
// });;

// // Logout user controller
// const logoutUser = asyncHandler(async (req, res) => {
//   await User.findByIdAndUpdate(
//     req.user._id,
//     { $unset: { refreshToken: "" } },
//     { new: true }
//   );

//   return res.status(200).json(new ApiResponse(200, {}, "User logged out", "success"));
// });

// // Add company controller
// const addCompanies = asyncHandler(async (req, res) => {
//   const {
//     name,
//     location,
//     status,
//     industry,
//     visitDate,
//     website,
//     description,
//     process,
//     positions,
//   } = req.body || {};

//   if (
//     [name, location, status, industry, visitDate, website, description, process, positions].some(
//       isEmpty
//     )
//   ) {
//     throw new ApiError(400, "All fields are required");
//   }

//   // Parse arrays if sent as JSON strings
//   const parsedProcess = typeof process === "string" ? JSON.parse(process) : process;
//   const parsedPositions =
//     typeof positions === "string" ? JSON.parse(positions) : positions;
//   const parsedVisitDate = new Date(visitDate);

//   parsedPositions.forEach((pos, idx) => {
//     const { title, department, type, experience, ctc, eligibility, deadline, skills } = pos;

//     if (
//       [title, department, type, experience, ctc, eligibility, deadline, skills].some(isEmpty)
//     ) {
//       throw new ApiError(400, `Position at index ${idx} is missing required fields.`);
//     }

//     if (typeof skills === "string") {
//       pos.skills = JSON.parse(skills);
//     }

//     pos.deadline = new Date(deadline);
//     pos.id = `POS${Date.now()}${idx}`;
//   });

//   if (!req.file || !req.file.path) {
//     throw new ApiError(400, "Logo file is required");
//   }

//   const logo = await uploadOnCloudinary(req.file.path);
//   if (!logo || !logo.url) {
//     throw new ApiError(400, "Failed to upload logo");
//   }

//   const company = await Company.create({
//     user: req.user._id,
//     name,
//     location,
//     status,
//     industry,
//     visitDate: parsedVisitDate,
//     website,
//     description,
//     process: parsedProcess,
//     positions: parsedPositions,
//     logo: logo.url,
//   });

//   return res.status(201).json(
//     new ApiResponse(201, company, "New company registered successfully", "success")
//   );
// });

// // Companies dashboard controller
// const companiesDashboard = asyncHandler(async (req, res) => {
//   const userId = req.user._id;

//   console.log(userId);
  

//   const companies = await Company.find({ user: userId });

//   console.log(companies);
  

//   return res.status(200).json(
//     new ApiResponse(200, companies, "Companies fetched successfully", "success")
//   );
// });

// export {
//   registerUser,
//   loginUser,
//   logoutUser,
//   addCompanies,
//   companiesDashboard,
//   registerCollege,
// };


import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";
import { Company } from "../models/companies.model.js";
import CollegeContact from "../models/collegeRegistrationQuery.models.js";
import nodemailer from 'nodemailer'

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


// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL, // e.g., your Gmail address
    pass: process.env.SMTP_PASSWORD, // Gmail app password
  },
});

const registerUser = asyncHandler(async (req, res) => {
  const { collageName, email, password } = req.body;

  if ([collageName, email, password].some((field) => !field)) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  // Remove from CollegeContact if exists
  const collageDatabaseUser = await CollegeContact.findOne({ email });
  if (collageDatabaseUser) {
    await collageDatabaseUser.deleteOne();
  }

  // Create new user
  const user = await User.create({ collageName, email, password });
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Error registering user");
  }

  const logoUrl = "https://example.com/logo.png"; // Replace with your actual logo URL

  // 📧 Email to the new user
  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Registration Successful!",
    html: `
      <div style="text-align: center;">
        <img src="${logoUrl}" alt="Campus Connect Logo" style="max-width: 150px; margin-bottom: 20px;" />
      </div>
      <p>Hello <b>${collageName}</b>,</p>
      <p>Your registration is successful!</p>
       <ul>
        <li><b>College Name:</b> ${collegeName}</li>
        <li><b>Email:</b> ${email}</li>
      </ul>
      <p>Please change your password by clicking the button below:</p>
      <p style="text-align: center;">
        <a href="https://campus-connect-frontend-fufn.onrender.com/"
           style="
             display: inline-block;
             padding: 10px 20px;
             background-color: #4CAF50;
             color: #ffffff;
             text-decoration: none;
             border-radius: 5px;
             font-weight: bold;">
          Change Password
        </a>
      </p>
      <p>Best regards,<br>Campus Connect Team</p>
    `
  });

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully", "success")
  );
});



const registerCollege = asyncHandler(async (req, res) => {
  const {
    collegeName,
    email,
    contactNumber,
    role,
    address,
    notes,
  } = req.body;

  // Validate required fields
  if ([collegeName, email].some(isEmpty)) {
    throw new ApiError(400, "College Name and Email are required");
  }

  // Optional: Check if the college with the same email already exists
  const existingCollege = await CollegeContact.findOne({ email });
  if (existingCollege) {
    throw new ApiError(409, "College with this email already registered");
  }

  // Create the college contact entry
  const college = await CollegeContact.create({
    collegeName,
    email,
    contactNumber,
    role,
    address,
    notes,
  });

  if (!college) {
    throw new ApiError(500, "Error registering college");
  }

  const createdCollege = await CollegeContact.findById(college._id).select('-__v');

  const info = await transporter.sendMail({
    from: email, // new user's email
    to: process.env.SMTP_EMAIL, // admin/host email
    subject: "New College Registration Alert",
    html: `
     <div style="text-align: center;">
        <img src="${logoUrl}" alt="Campus Connect Logo" style="max-width: 150px; margin-bottom: 20px;" />
      </div>
      <p>Hello Admin,</p>
      <p>A new college has just registered on Campus Connect:</p>
      <ul>
        <li><b>College Name:</b> ${collegeName}</li>
        <li><b>Email:</b> ${email}</li>
      </ul>
      <p>You can view the full details or manage this registration by clicking the button below:</p>
      <p>
        <a href="https://campus-connect-frontend-fufn.onrender.com/" 
           style="
             display: inline-block;
             padding: 10px 20px;
             background-color: #007BFF;
             color: #ffffff;
             text-decoration: none;
             border-radius: 5px;
             font-weight: bold;">
          Go to Admin Dashboard
        </a>
      </p>
      <p>Best regards,<br>Campus Connect System</p>
    `
  });
  

  return res.status(201).json(
    new ApiResponse(201, createdCollege, "College registered successfully", "success")
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

  return res.status(200).json(new ApiResponse(200, {}, "User logged out", "success"));
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

  if (
    [name, location, status, industry, visitDate, website, description, process, positions].some(
      isEmpty
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Parse arrays if sent as JSON strings
  const parsedProcess = typeof process === "string" ? JSON.parse(process) : process;
  const parsedPositions =
    typeof positions === "string" ? JSON.parse(positions) : positions;
  const parsedVisitDate = new Date(visitDate);

  parsedPositions.forEach((pos, idx) => {
    const { title, department, type, experience, ctc, eligibility, deadline, skills } = pos;

    if (
      [title, department, type, experience, ctc, eligibility, deadline, skills].some(isEmpty)
    ) {
      throw new ApiError(400, `Position at index ${idx} is missing required fields.`);
    }

    if (typeof skills === "string") {
      pos.skills = JSON.parse(skills);
    }

    pos.deadline = new Date(deadline);
    pos.id = `POS${Date.now()}${idx}`;
  });

  if (!req.file || !req.file.path) {
    throw new ApiError(400, "Logo file is required");
  }

  const logo = await uploadOnCloudinary(req.file.path);
  if (!logo || !logo.url) {
    throw new ApiError(400, "Failed to upload logo");
  }

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
    new ApiResponse(201, company, "New company registered successfully", "success")
  );
});

// Companies dashboard controller
const companiesDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const companies = await Company.find({ user: userId });

  return res.status(200).json(
    new ApiResponse(200, companies, "Companies fetched successfully", "success")
  );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  addCompanies,
  companiesDashboard,
  registerCollege,
};