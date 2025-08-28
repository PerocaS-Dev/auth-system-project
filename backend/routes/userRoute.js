const express = require("express");
const User = require("../models/userModel");

//controller funstions
const {
  signupUser,
  loginUser,
  getProfile,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  editProfile,
  deleteUser,
} = require("../controllers/userController");

//middleware
const { verifyToken, requireRole } = require("../middlewares/auth");

const router = express.Router();

// ================== PUBLIC ROUTES(no token needed) ================== //

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

// Refresh token endpoint
router.post("/refresh-token", refreshAccessToken);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

// ================== PROTECTED ROUTES ================== //

//get logged-in user profile
router.get("/profile", verifyToken, getProfile);

router.put("/profile", verifyToken, editProfile);

router.delete("/user/:userId", verifyToken, requireRole(["admin"]), deleteUser);

// admin-only route
router.get("/users", verifyToken, requireRole(["admin"]), async (req, res) => {
  // only admins can see this
  const users = await User.find().select("-password");
  res.json(users);
});

module.exports = router;
