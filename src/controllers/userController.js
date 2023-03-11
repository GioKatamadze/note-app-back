import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

export const RegisterUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw Error("User already exists");
    res.status(404).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      user_id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    throw Error("invalid user data");
    res.status(400).json({ message: "invalid user data" });
  }
});

export const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      user_id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    throw Error("invalid email or password");
    res.status(401).json({ message: "invalid email or password" });
  }
});
