import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
export const Register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      message: "User created",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Error in register route:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};