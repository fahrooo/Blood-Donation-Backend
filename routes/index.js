import express from "express";
import {
  deleteFaculty,
  getFaculty,
  getFacultyById,
  postFaculty,
  putFaculty,
} from "../controller/Faculty.js";
import {
  deleteUser,
  getUser,
  getUserById,
  postUser,
  putUser,
} from "../controller/Users.js";
import {
  deleteSchedule,
  getSchedule,
  getScheduleById,
  postSchedule,
  putSchedule,
} from "../controller/Schedule.js";
import {
  deleteDonor,
  donorByDate,
  donorByMonthYear,
  getDonor,
  getDonorById,
  postDonor,
  putDonor,
} from "../controller/Donor.js";
import {
  deleteEmail,
  getEmail,
  getEmailById,
  postEmail,
  putEmail,
  sendEmail,
} from "../controller/Email.js";
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
router.get("/users/:id", getUserById);
router.post("/users", postUser);
router.put("/users/:id", putUser);
router.delete("/users/:id", deleteUser);

// Schedule
router.get("/schedule", getSchedule);
router.get("/schedule/:id", getScheduleById);
router.post("/schedule", postSchedule);
router.put("/schedule/:id", putSchedule);
router.delete("/schedule/:id", deleteSchedule);

// Donor
router.get("/donor", getDonor);
router.get("/donor/:id", getDonorById);
router.post("/donor", postDonor);
router.put("/donor/:id", putDonor);
router.delete("/donor/:id", deleteDonor);
router.post("/donor/bydate", donorByDate);
router.post("/donor/bymonthyear", donorByMonthYear);

// Email
router.get("/email", getEmail);
router.get("/email/:id", getEmailById);
router.post("/email", postEmail);
router.put("/email/:id", putEmail);
router.delete("/email/:id", deleteEmail);
router.post("/email/send", sendEmail);

export default router;
