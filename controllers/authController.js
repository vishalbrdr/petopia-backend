const User = require("../models/userModel");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var { expressjwt } = require("express-jwt");
const { default: axios } = require("axios");

exports.signup = async (req, res) => {
  // checking for validation errors
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    // check if email exists
    const { email } = req.body;
    const userWithExistingEmail = await User.findOne({ email });
    console.log(userWithExistingEmail);
    if (userWithExistingEmail) {
      return res.status(401).json({
        error: "email already exists",
      });
    }

    // extracting new user data from req body
    const user = new User(req.body);
    // saving user in DB
    const userData = await user.save();

    if (!userData._id)
      return res.json({
        error: "there was a problem in singup, please try again",
      });
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // Put TOKEN in a cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // Send response to the front end
    const { _id, name, petListings, favoritePets } = user;
    res.json({ token, user: { _id, name, email, petListings, favoritePets } });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  // Checking for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "Email not found",
      });
    }

    // Authenticate the user with the provided password
    if (!user.authenticate(password)) {
      return res
        .status(400)
        .json({ error: "Email or Password does not match" });
    }

    // Create TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // Put TOKEN in a cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // Send response to the front end
    const { _id, name, petListings, favoritePets } = user;
    res.json({ token, user: { _id, name, email, petListings, favoritePets } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "you have been successfully singed out" });
};

// protected route
exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  requestProperty: "auth",
  algorithms: ["HS256"],
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker =
    req.userProfile && req.auth && req.userProfile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
