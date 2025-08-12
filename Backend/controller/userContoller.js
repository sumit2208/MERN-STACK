const user = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "yourVerySecretKey"; // use .env in real apps

const createUser = async (req, res) => {
  try {
    const { name, password, contact } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      name,
      password: hashedpassword,
      contact,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const existingUser = await user.findOne({ name });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign( { id: existingUser._id, name: existingUser.name }, JWT_SECRET, {expiresIn:"24h"} );
    

    res.status(200).json({ message: "Login successful", token, user: existingUser });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

module.exports = { createUser, login };
