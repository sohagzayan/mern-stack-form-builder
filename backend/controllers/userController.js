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
  const { avatar, name, email, password } = userData;
  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars",
    width: 1000,
    crop: "scale",
  });
  // const { name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    avatar: {
      publicId: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  /** Get jwt token and store token on cookie */
  sendToken(user, 200, res);
});
