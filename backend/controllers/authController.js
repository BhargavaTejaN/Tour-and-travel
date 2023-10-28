import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const secreatKey = process.env.JWT_SECRET_KEY || "fr678tfvfrtyytfvyyg98uyg9876tgw";

// create a new jwt token
const createToken = (_id) => {
  return jwt.sign({ _id }, secreatKey, { expiresIn: "15d" });
};

// user register route
export const register = async (req, res) => {
  const { username, email, password,photo} = req.body;

  const emptyFields = [];

  if (!username) emptyFields.push("username");
  if (!email) emptyFields.push("email");
  if (!password) emptyFields.push("password");

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

    const slat = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, slat);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      photo,
      role: "user",
    });
    res.status(200).json({
      success: true,
      message: "User Successfully created",
      data: newUser,
    });
  } catch (error) {
    console.log("Error While Registiring The User In Backend : ", error);
    res.status(500).json({
      success: false,
      message: "Failed To Register The User",
      error: error.message,
    });
  }
};

// user login route
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Required Fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email Is Not Registered Yet",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    // create a jwt token
    const token = createToken(user._id);

    // set token in the browser cookies and send the response to the client
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        success: true,
        message: "User Logged In Successfully!",
        data: user,
      });
  } catch (error) {
    console.log("Error While Login In Backend : ", error);
    res.status(500).json({
      success: false,
      message: "Failed To Login",
      error: error.message,
    });
  }
};
