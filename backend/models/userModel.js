const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: false,
  },
  surname: {
    type: String,
    require: true,
    unique: false,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  contact: {
    type: Number,
    require: false,
    unique: false,
  },
  display: {
    type: String,
    require: false,
    unique: false,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["guest", "admin", "moderator"],
    default: "guest",
  },
});

userSchema.statics.signup = async function (
  name,
  surname,
  username,
  email,
  password,
  role
) {
  //validation
  if (!name || !surname || !username || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("password not strong enough");
  }

  const emailExists = await this.findOne({ email });
  const usernameExists = await this.findOne({ username }); // Fixed: changed { email } to { username }

  if (emailExists) {
    throw Error("Email already in use");
  }

  if (usernameExists) {
    throw Error("Username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    surname,
    username,
    email,
    password: hash,
    role,
  });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
