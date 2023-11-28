const Pet = require("../models/petModel");
const User = require("../models/userModel");

exports.postPet = async (req, res) => {
  try {
    const petData = req.body;
    const userId = req.userProfile._id;
    petData.owner = userId;
    const pet = new Pet(petData);
    const savedPet = await pet.save();

    // Update the user's pet listings by pushing the new pet objectId
    const user = await User.findByIdAndUpdate(userId, {
      $push: { petsListings: savedPet._id },
    });

    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json({ pets });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getPetById = async (req, res) => {
  const { petId } = req.params;
  try {
    const pet = await Pet.findById(petId).populate("owner");
    pet.owner.encry_password = undefined;
    pet.owner.salt = undefined;
    pet.owner.petsListings = undefined;
    pet.owner.favoritePets = undefined;

    console.log(pet);
    res.json(pet);
  } catch (error) {
    res.status(400).json(error);
  }
};
