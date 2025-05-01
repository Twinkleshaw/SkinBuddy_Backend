import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import jwt from "jsonwebtoken"
const client = new OAuth2Client(process.env.CLIENT_ID);

export const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    console.log("User Info:", { email, name, picture });
    if (!email || !name) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    // Check if the user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if not exists
      user = new User({
        name,            
        email,
        password: "google", 
        userImage: picture,
      });
      
      await user.save();
    }

    // Generate JWT token
    const payload = { id: user._id };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });


    res.json({
      success: true,
      token:jwtToken,
      user: { email, name, picture },
      message: "Login successful",
    });
  } catch (err) {
    console.error("Google Login Failed:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
