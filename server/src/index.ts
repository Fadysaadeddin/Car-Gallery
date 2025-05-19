import express from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes placeholder
app.use("/api/users", userRoutes);
app.get("/", (_req, res) => {
  res.send("Car Gallery API is running!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
