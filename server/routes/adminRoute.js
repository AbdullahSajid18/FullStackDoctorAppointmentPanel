import express from "express";
import {
  addDoctor,
  adminDashboard,
  adminLogin,
  allDoctors,
  appointmentsAdmin,
  cancellationOfAppointment,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

// Making a router
const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", adminLogin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, cancellationOfAppointment);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
