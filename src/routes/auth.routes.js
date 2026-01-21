
import { Router } from "express";
import * as c from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", c.register);
router.post("/login", c.login);
router.post("/forgot-password", c.forgotPassword);
router.post("/verify-otp", c.verifyOtp);
router.post("/reset-password", c.resetPassword);

export default router;
