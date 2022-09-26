const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 65,
    },
    profileImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
