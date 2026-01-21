import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user
  });
});

export default router;
