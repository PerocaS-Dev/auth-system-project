require("dotenv").config();
const cors = require("cors");
const express = require("express"); // importing express
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");

// creating the express app
const app = express();

app.use(
  cors({
    origin: "https://auth-system-project.netlify.app/", // Allow Netlify frontend
    credentials: true,
  })
);

//Middleware: Runs on every request. Like a bouncer checking names before letting people in
app.use(express.json()); // This middleware works with a post request and checks if there is data or body to the request

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Route or Request handler: These will be unique per request. so each button press will have its own request handler.
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

//use the imported listing routes

 app.use("/api/user", userRoute);

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests and start the server on the port
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log("connected to db and listening on port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
  