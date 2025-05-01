import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class UserController {
  async signup(req, res) {
    try {
      const { name, email, password } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(401).json({ message: "user already exists" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashPassword,
      });
     
      await newUser.save();
      res
        .status(201)
        .json({ message: "user created successfully"});
    } catch (error) {
      res
        .status(500)
        .json({ message: "user creation failed", error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userExists = await User.findOne({ email });
      if (!userExists) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const isMatch = await bcrypt.compare(password, userExists.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.status(200).json({message:"User loggedIn successfully",token})
    } catch (error) {
      res.status(500).json({ message: "An error occurred during login" });
    }
  }
}

export default new UserController();
