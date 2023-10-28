import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

// create new user
export const createNewUser = async (req, res) => {
  const { username, email, password, photo, role } = req.body;

  const emptyFields = [];

  if (!username) emptyFields.push("username");
  if (!email) emptyFields.push("email");
  if (!password) emptyFields.push("password");
  if (!photo) emptyFields.push("photo");
  if (!role) emptyFields.push("role");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "please fill in all the fields",
      emptyFields,
      success: false,
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
        error: "Try Different Email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      photo,
      role,
    });
    res.status(200).json({
      success: true,
      message: "User Successfully created",
      data: newUser,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorFields = Object.keys(error.errors);
      const errorMessage = error.message;
      return res
        .status(400)
        .json({ success: false, error: errorMessage, errorFields });
    }
    console.log("Error While Creating a new user : ", error);
    res.status(500).json({
      success: false,
      message: "Failed to Create New User",
      error: error.message,
    });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, password, photo, role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const findUser = await User.findById(id);

    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "No User Found",
      });
    }

    const isValidPassword = await bcrypt.compare(password, findUser.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
        error: "Incorrect Password. Authorization Failed.",
      });
    }

    const updatedData = {};
    if (username && username !== findUser.username) {
      updatedData.username = username;
    }
    if (email && email !== findUser.email) {
      updatedData.email = email;
    }
    if (photo && photo !== findUser.photo) {
      updatedData.photo = photo;
    }
    if (role && role !== findUser.role) {
      updatedData.role = role;
    }

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No changes to update",
      });
    }

    const udpdatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );

    if (!udpdatedUser) {
      return res.status(404).json({
        success: false,
        message: "Failed To Update",
      });
    }

    return res.status(200).json({
      success: true,
      data: udpdatedUser,
      message: "success",
    });
  } catch (error) {
    console.log("Error While Updating the user in backend : ", error);
    res.status(500).json({
      success: false,
      message: "Failed To Update The User",
      error: error.message,
    });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const userExists = await User.findById(id);

    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "The user does not exist",
      });
    }

    const isValidPassword = await bcrypt.compare(password, userExists.password);

    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Wrong Password",
      });
    }

    const removeUser = await User.findByIdAndDelete(id);

    if (!removeUser) {
      return res.status(400).json({
        success: false,
        message: "Couldn't Delete The User",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully Deleted The User!",
    });
  } catch (error) {
    console.log("Error While Deleting The User In Backend : ", error);
    res.status(500).json({
      success: false,
      message: "Failed To Delete The User",
      error: error.message,
    });
  }
};

// get single user
export const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
      message: "success",
    });
  } catch (error) {
    console.log("Error While Fetching User In Backend : ", error);
    res.status(500).json({
      success: false,
      message: "Failed To fetch User",
      error: error.message,
    });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Users Found",
      });
    }

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
      message: "Success",
    });
  } catch (error) {
    console.log("Error While Fetching All Users In The Backend : ", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Users",
      error: error.message,
    });
  }
};
