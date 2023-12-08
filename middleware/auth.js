const jwt = require("jsonwebtoken");
// create token for password hashing
const createToken = (id) => {
  return (token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  }));
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ error: true, message: "Authentication invalid" });
  }
  const token = authHeader.split(" ")[1];

  if (token) {
    // decodedToken will return the user payload in this case userId
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // redirect to the login page
        res.status(403).json({ error: true, message: "Invalid token" });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ error: true, message: "You are not authenticated" });
  }
};

module.exports = {
  verifyToken,

  createToken,
};
