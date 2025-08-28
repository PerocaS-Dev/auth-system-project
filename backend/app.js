require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");

const app = express();

//***** / Add this at the very top of your app.js to verify environment variables *****
console.log("ACCESS_SECRET loaded:", process.env.ACCESS_SECRET ? "Yes" : "No");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://locked-by-peroca.netlify.app/"],
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/user", userRoute);

module.exports = app; // <-- ONLY the app
