const express = require("express");
const router = express.Router();

const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/authController");
const { getUserById, getUser } = require("../controllers/userController");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, getUser);

router.get(
  "/users/:userId/favouritePets",
  isSignedIn,
  isAuthenticated
  // getUserFavoritePets
);

// router.get(
//   "/orders/user/:userId",
//   isSignedIn,
//   isAuthenticated,
//   getUserPurchaseList
// );

module.exports = router;
