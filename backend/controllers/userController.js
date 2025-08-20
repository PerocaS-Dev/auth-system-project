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
  const { email, password, role = "guest" } = req.body;

  try {
    const user = await User.signup(email, password, role);
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

    // setup email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

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
  const { token, newPassword } = req.body;

  try {
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
};
