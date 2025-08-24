import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { VerifyToken } from "../middleware/VerifyToken.js";
import { RefreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", VerifyToken, getUsers);
router.post("/Register", Register);
router.post("/Login", Login);
router.get("/token", RefreshToken);
router.delete("/Logout", Logout);

export default router;
