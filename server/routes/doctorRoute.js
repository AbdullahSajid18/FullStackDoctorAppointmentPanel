import express from 'express'
import { doctorAppointments, doctorList, doctorLoginHandler, completedAppointments, cancelledAppointments, doctorsDashboardData, doctorProfileData, updateDoctorProfile } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();

// Add routes here

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', doctorLoginHandler);
doctorRouter.get('/appointments', authDoctor, doctorAppointments);
doctorRouter.post('/complete-appointment', authDoctor, completedAppointments);
doctorRouter.post('/cancel-appointment', authDoctor, cancelledAppointments);
doctorRouter.get('/dashboard', authDoctor, doctorsDashboardData)
doctorRouter.get('/profile', authDoctor, doctorProfileData)
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)

export default doctorRouter;
