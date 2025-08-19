const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // grabbing token fron the authorization string Bearer bsdisdb(the token)
  if (!token) return res.status(401).json({ message: "Access denied" }); //if no token is found from user request, error

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifies if the token's signature and expiration date
    req.user = decoded; // e.g., { id, email } --> attach the decoded user info to the req object, so that any route using this middleware can now access req.user
    next();//This passes control to the next function or route handler in the stack — only called if the token is valid.
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });//when there is a token bit it is invalid
  }
};

module.exports = verifyToken;
