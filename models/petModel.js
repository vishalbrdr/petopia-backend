const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    breed: { type: String },
    age: { type: Number },
    description: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }, // Reference to the user who owns the pet
    favoriteOf: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
