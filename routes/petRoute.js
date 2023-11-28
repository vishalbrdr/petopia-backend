const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/authController");
const {
  postPet,
  getAllPets,
  getPetById,
} = require("../controllers/petController");
const { getUserById } = require("../controllers/userController");

const express = require("express");
const router = express.Router();
router.param("userId", getUserById);
router.get("/pets", getAllPets);
router.get("/pets/:petId", getPetById);
router.post("/pets/:userId", isSignedIn, isAuthenticated, postPet);
module.exports = router;
