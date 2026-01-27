import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import patientRoutes from "./patient.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/patient", patientRoutes);


export default router;
