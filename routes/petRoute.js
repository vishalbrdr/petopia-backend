const Pet = require("../models/petModel");
const User = require("../models/userModel");

const express = require("express");
const router = express.Router();
router.post("/pets", async (req, res) => {
  try {
    const petData = req.body;
    const pet = new Pet(petData);
    await pet.save();

    // Assuming you have the user's ID as `req.user.id`
    const userId = req.userProfile._id;

    // Update the user's pet listings by pushing the new pet object
    const user = await User.findByIdAndUpdate(userId, {
      $push: { petsListings: pet },
    });

    res.status(201).JSON(pet);
  } catch (error) {
    res.status(400).JSON(error);
  }
});
