const User = require("../models/userModel");

// GET user by user._id
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    // setting profile object of req params to user
    req.userProfile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.userProfile.salt = undefined;
  req.userProfile.encry_password = undefined;
  req.userProfile.createdAt = undefined;
  req.userProfile.updatedAt = undefined;
  return res.json(req.userProfile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.userProfile._id },
    { $set: req.body },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are NOT authorized to update this user",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};
