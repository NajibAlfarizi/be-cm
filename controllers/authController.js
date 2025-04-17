import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//sign-in
export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        if (user.role !== "admin") {
            res.status(StatusCodes.UNAUTHORIZED);
            throw new Error("Not authorized as admin");
        }
        res.json({
            _id: user._id,
            nama: user.nama,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("Invalid email or password");
    }
}
);

// register admin
export const registerAdmin = asyncHandler(async (req, res) => {
    const { nama, email, password } = req.body;
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      nama,
      email,
      password,
      role: "admin",
    });
  
    if (user) {
      res.status(StatusCodes.CREATED).json({
        _id: user._id,
        nama: user.nama,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error("Invalid user data");
    }
  });
  