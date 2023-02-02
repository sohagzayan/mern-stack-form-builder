const tryCatch = require("../middleware/tryCatch");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const userModel = require("../models/userModel");
const cloudinary = require("cloudinary");

// create a new user
exports.registerUser = tryCatch(async (req, res, next) => {
  const userData = req.body;
  const { name, email, password } = userData;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  /** Get jwt token and store token on cookie */
  sendToken(user, 200, res);
});

// login user
exports.loginUser = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password"));
  }

  /** if user not finding on database  */
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Invalid user email or password"));
  }

  /** Check user password is isValid */
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid user email or password"));
  }

  /** Get jwt token and store token on cookie */
  sendToken(user, 201, res);
});

/** Logout User */
exports.logOutUser = tryCatch(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});
