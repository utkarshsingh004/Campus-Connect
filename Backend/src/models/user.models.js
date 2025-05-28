// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const userSchema = new mongoose.Schema(
//   {
//     collageName: {
//       type: String,
//       required: true,
//       trim: true,
//       index: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [/.+\@.+\..+/, "Please fill a valid email address"],
//       index: true,
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//     },
//     refreshToken: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// // Pre-save middleware to hash password
// userSchema.pre('save', async function (next) {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   });

// // Instance method to check if entered password matches hashed password
// userSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// // Instance method to generate access token
// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       userName: this.userName,
//       fullName: this.fullName,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };

// // Instance method to generate refresh token
// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       userName: this.userName,
//       fullName: this.fullName,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };

// // Instance method to generate access token
// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       userName: this.userName,
//       fullName: this.fullName,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };

// // Instance method to generate refresh token
// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       userName: this.userName,
//       fullName: this.fullName,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );

// // Hide sensitive fields in JSON output
// userSchema.set("toJSON", {
//   transform: function (doc, ret) {
//     delete ret.password;
//     delete ret.refreshToken;
//     return ret;
//   },
// });
// }

// export const User = mongoose.model("User", userSchema);


import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    collageName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

// Instance method to check if entered password matches hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Instance method to generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Instance method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Hide sensitive fields in JSON output
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.refreshToken;
    return ret;
  },
});

export const User = mongoose.model("User", userSchema);