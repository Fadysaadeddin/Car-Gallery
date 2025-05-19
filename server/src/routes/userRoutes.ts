import { Router } from "express";
import { Register } from "../controllers/userController";
const router = Router();

router.post("/register", Register);

export default router;
