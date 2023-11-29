const express = require("express");
const router = express.Router();
const config = require("../../../config");
const Employee = require("../../../models/employee");
const { JWT_SECRET } = config;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { userName, password, email } = req.body;

    // Check if username exists
    const user = await Employee.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.userName },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const { password: _, ...employee } = user.toObject();

    res.json({ message: "Login successfully", user: employee, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
module.exports = router;
