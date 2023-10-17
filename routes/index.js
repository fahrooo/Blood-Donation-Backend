import express from "express";
import {
  deleteFaculty,
  getFaculty,
  getFacultyById,
  postFaculty,
  putFaculty,
} from "../controller/Faculty.js";
import { getUser } from "../controller/Users.js";
import { getSchedule } from "../controller/Schedule.js";
import { getDonor } from "../controller/Donor.js";
import { getEmail } from "../controller/Email.js";
import { login, register } from "../controller/Auth.js";

const router = express.Router();

// Auth
router.post("/register", register);
router.post("/login", login);

// Faculty
router.get("/faculty", getFaculty);
router.get("/faculty/:id", getFacultyById);
router.post("/faculty", postFaculty);
router.put("/faculty/:id", putFaculty);
router.delete("/faculty/:id", deleteFaculty);

// Users
router.get("/users", getUser);

// Schedule
router.get("/schedule", getSchedule);

// Donor
router.get("/donor", getDonor);

// Email
router.get("/email", getEmail);

export default router;