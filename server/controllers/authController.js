import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(process.env.BCRYPT_SEC);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(201).json("User is created successfully");
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User is not found!"));

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return next(createError(400, "Wrong password or username"));
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC
    );
    const { password, isAdmin, ...data } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ data });
  } catch (err) {
    next(err);
  }
};
