const express = require("express");
const router = express.Router();

const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/authController");
const {
  getUserById,
  getUser,
  addPetToFavorites,
  removePetFromFavorites,
} = require("../controllers/userController");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.post(
  "/user/:userId/favorite-pets",
  isSignedIn,
  isAuthenticated,
  addPetToFavorites
);

router.delete(
  "/users/:userId/favorite-pets/:petId",
  isSignedIn,
  isAuthenticated,
  removePetFromFavorites
);

module.exports = router;
