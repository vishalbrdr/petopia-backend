const Pet = require("../models/petModel");
const User = require("../models/userModel");

// GET user by user._id
exports.getUserById = async (req, res, next, userId) => {
  try {
    const user = await User.findById(userId)
      .populate("favoritePets")
      .populate("petListings");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user);
    req.userProfile = user;
    console.log(req.userProfile);
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUser = (req, res) => {
  req.userProfile.salt = undefined;
  req.userProfile.encry_password = undefined;
  req.userProfile.createdAt = undefined;
  req.userProfile.updatedAt = undefined;
  return res.json(req.userProfile);
};

exports.addPetToFavorites = async (req, res) => {
  try {
    const userId = req.userProfile._id;
    const petId = req.body.petId; // Assuming you provide the pet ID in the request body

    const user = await User.findById(userId);
    const pet = await Pet.findById(petId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userId == pet.owner) {
      return res
        .status(401)
        .json({ error: "cannot add owned pets to favorites" });
    }
    // Check if the pet is already in favorites to avoid duplication
    if (user.favoritePets.includes(petId)) {
      return res.status(400).json({ error: "Pet is already in favorites" });
    }

    // Add the pet to favorites
    user.favoritePets.push(petId);
    pet.favoriteOf += 1;
    await user.save();
    await pet.save();

    res.status(201).json({ message: "Pet added to favorites" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removePetFromFavorites = async (req, res) => {
  try {
    const userId = userProfile._id;
    const petId = req.params.petId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the pet is in favorites
    const index = user.favoritePets.indexOf(petId);
    if (index === -1) {
      return res.status(400).json({ error: "Pet is not in favorites" });
    }

    // Remove the pet from favorites
    user.favoritePets.splice(index, 1);
    await user.save();

    res.json({ message: "Pet removed from favorites" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
