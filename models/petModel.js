const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    animalType: { type: String, required: true },
    breed: { type: String, required: true },
    dob: { type: Date, required: true },
    description: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to the user who owns the pet
    favoriteOf: {
      type: Number,
      default: 0,
    },
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);
const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
