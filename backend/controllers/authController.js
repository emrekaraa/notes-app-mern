const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please send email and password" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  if (!req.body.fullName || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ error: "Please send name, email and password" });
  }

  if (req.body.password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }

  try {
    const alreadyExistUser = await UserModel.findOne({ email: req.body.email });
    if (alreadyExistUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = await UserModel.create({
      fullName: req.body.fullName,
      email: req.body.email,
      profileImage: req.body.profileImage,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    res.status(201).json({
      fullName: newUser.fullName,
      email: newUser.email,
      profileImage: newUser.profileImage,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

module.exports = {
  login,
  register,
};
