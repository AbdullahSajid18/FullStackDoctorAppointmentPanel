import express from "express";
import {
  appointmentCancellation,
  listAppointment,
  bookingAppointment,
  getUserProfile,
  registeringUser,
  updatingUserProfile,
  userLogin
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

// Making a router
const userRouter = express.Router();

// POST Routes
userRouter.post("/register", registeringUser);
userRouter.post("/login", userLogin);
userRouter.post("/update-profile", upload.single('image'), authUser,updatingUserProfile);
userRouter.post('/book-appointment', authUser, bookingAppointment)
userRouter.post('/cancel-appointment', authUser, appointmentCancellation);

// GET Routes
userRouter.get("/get-profile",authUser, getUserProfile);
userRouter.get('/appointments', authUser, listAppointment)


export default userRouter;
