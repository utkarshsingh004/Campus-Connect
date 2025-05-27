import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Make sure to import this for password hashing
import jwt from 'jsonwebtoken'; // And for token generation
import dotenv from "dotenv";
dotenv.config();


const hostSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
}, { timestamps: true });

// Pre-save middleware to hash password
hostSchema.pre('save', async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method to check if entered password matches hashed password
hostSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Instance method to generate access token
hostSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Instance method to generate refresh token
hostSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

// Hide sensitive fields in JSON output
hostSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.refreshToken;
    return ret;
  }
});

export const Host = mongoose.model('Host', hostSchema);
