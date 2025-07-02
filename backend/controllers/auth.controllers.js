import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { upsertStreamUser } from "../configs/stream.js";

const signUpController = async (req, res) => {
  const { email, password, fullName } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ mssg: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ mssg: "Password must be more than 6 characters" });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ mssg: "Needed proper email" });
    }
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({ mssg: "email already exists" });
    }
    const randomAvatar = Math.floor(Math.random() * 150) + 1;
    const avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${randomAvatar}`;

    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullName,
      profilePic: avatar,
    });

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream User Created for ${newUser.fullName} `);
    } catch (error) {
      console.log("error creating stream user", error);
    }
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",

      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(201)
      .json({
        mssg: "user successfully created",
        success: true,
        user: newUser,
      });
  } catch (error) {
    console.log("Error in Signingup", error);
    res.status(500).json({ mssg: "Error in signing up the user" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ mssg: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ mssg: "Email not found or Invalid email" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ mssg: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ mssg: "Login successful", success: true, user });
  } catch (error) {
    console.log("Error in Login", error);
    res.status(500).json({ mssg: "Error in logging in the user" });
  }
};
const logoutController = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ mssg: "Logout successful", success: true });
};

const onboardController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, bio, nativeLanguage, location, learningLanguage } =
      req.body;
    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !location ||
      !learningLanguage
    ) {
      return res.status(400).json({
        mssg: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !location && "location",
          !learningLanguage && "learningLanguage",
        ].filter(Boolean),
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ mssg: "User Not updated Properly" });
    }
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log(`Stream User Updated for ${updatedUser.fullName} `);
    } catch (stremError) {
      console.log(
        "error creating stream user for updatesUser-onboard",
        stremError.message
      );
    }

    res.status(200).json({ mssg: "user Updated successfully", updatedUser });
  } catch (error) {
    console.log("Error in onboardController");
    return res.status(500).json({ mssg: "Error onboarding user" });
  }
};

export {
  signUpController,
  loginController,
  logoutController,
  onboardController,
};
