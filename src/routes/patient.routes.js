
import { Router } from "express";
import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient
} from "../controllers/patient.controller.js";

const router = Router();

router.post("/", createPatient);        // CREATE
router.get("/", getPatients);           // TABLE
router.get("/:id", getPatientById);     // EDIT LOAD
router.put("/:id", updatePatient);      // EDIT SAVE
router.delete("/:id", deletePatient);   // DELETE

export default router;
