const express = require("express");
const router = express.Router();
const {
  signout,
  signup,
  signin,
  isSignedIn,
} = require("../controllers/authController");
const { check } = require("express-validator");

router.post(
  "/signup",
  // validation of firstname
  check("name")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 chars long"),
  // validation of email
  check("email").isEmail().withMessage("email is required"),
  // validation of password
  check("password")
    .isLength({ min: 5 })
    .withMessage("password must be at least 5 chars long"),
  signup
);

router.post(
  "/signin",
  // validation of email
  check("email").isEmail().withMessage("email is required"),
  // validation of password
  check("password")
    .isLength({ min: 1 })
    .withMessage("password field is required"),
  signin
);

router.get("/signout", signout);

module.exports = router;
