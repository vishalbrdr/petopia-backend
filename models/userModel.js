const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  encry_password: {
    type: String,
    required: true,
  },
  salt: String,
  petListings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
  favoritePets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
});

userSchema
  .virtual("password")
  // storing hash value of password to database
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4(); //setting salt value to unique random value
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  // authenticating plainpassword recieved from client with encry_password in database
  authenticate: function (plainpassword) {

    return this.securePassword(plainpassword) === this.encry_password;
  },

  // creating hash value of plainpassword
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      console.log(err);
    }
  },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
