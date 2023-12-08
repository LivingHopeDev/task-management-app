const db = require("../db");
const bcrypt = require("bcrypt");
const { createToken } = require("../middleware/auth");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // Check if email already exists
    const existingUser = await db.query("SELECT * from user WHERE email = ?", [
      email,
    ]);
    if (existingUser[0].length > 0) {
      return res.status(200).json({ message: "Email already exists" });
    }

    // Insert new user
    await db.query("INSERT INTO user SET ?", {
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({ message: "Registration completed: Login now!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const [[user, _]] = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    if (!user) {
      return res.status(404).json({ message: "Invalid password or email" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password or email" });
    }
    const token = createToken(user.id);

    delete user.password;
    return res
      .status(200)
      .json({ success: true, message: "Login successful", user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  register,
  login,
};
