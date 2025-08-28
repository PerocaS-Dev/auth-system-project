const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// ========== TOKEN HELPERS ========== //

// Short-lived access token (used for API calls)
const createAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, role: user.role },
    process.env.ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

// Long-lived refresh token (used to get new access tokens)
const createRefreshToken = (_id) => {
  return jwt.sign({ _id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user._id);

    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//sign up user
const signupUser = async (req, res) => {
  const {
    name,
    surname,
    username,
    email,
    password,
    confirmPassword,
    role = "guest",
  } = req.body;

  try {
    // confirm password check
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.signup(
      name,
      surname,
      username,
      email,
      password,
      role
    );

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user._id);
    console.log("Incoming signup body:", req.body);

    res.status(200).json({
      user: {
        name: user.name,
        surname: user.surname,
        username: user.username,
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// userController.js - getProfile function
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user); // Explicitly set status 200
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const editProfile = async (req, res) => {
  try {
    const {
      name,
      surname,
      username,
      contact,
      display,
      oldPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    // Find the user making the request
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Handle password update
    if (oldPassword && newPassword && confirmPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Old password is incorrect" });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "New passwords do not match" });
      }

      user.password = await bcrypt.hash(newPassword, 10);
    } else if (oldPassword || newPassword || confirmPassword) {
      return res
        .status(400)
        .json({ error: "All password fields are required" });
    }

    // Update other fields if provided
    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (username) user.username = username;
    if (contact) user.contact = contact;
    if (display) user.display = display;

    await user.save();

    // Don’t return password
    const { password, ...updatedUser } = user.toObject();

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Add this controller function before the module.exports
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate MongoDB ID format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Prevent admin from deleting themselves
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ error: "Cannot delete your own account" });
    }

    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prevent deleting other admins
    if (userToDelete.role === "admin") {
      return res.status(403).json({ error: "Cannot delete admin accounts" });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser: {
        _id: userToDelete._id,
        email: userToDelete.email,
        username: userToDelete.username,
        role: userToDelete.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// refresh access token using refresh token
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    // get the latest user data
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // issue a new access token with _id + role
    const newAccessToken = createAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

// forgot password: generate token & send email
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // create a short-lived reset token (valid for 15 min)
    const resetToken = jwt.sign({ _id: user._id }, process.env.RESET_SECRET, {
      expiresIn: "15m",
    });

    // TEMPORARY: Log the token for testing
    console.log("RESET TOKEN FOR TESTING:", resetToken);
    console.log("For user:", user.email);

    // setup email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset</p>
             <p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 15 minutes.</p>`,
    });

    res.json({ message: "Password reset link sent to email" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// reset password
const resetPassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  try {
    if (!newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ error: "Both password fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const decoded = jwt.verify(token, process.env.RESET_SECRET);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(decoded._id, { password: hashedPassword });

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getProfile,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  editProfile,
  deleteUser,
};
