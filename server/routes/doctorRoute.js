import express from 'express'
import { doctorAppointments, doctorList, doctorLoginHandler, completedAppointments, cancelledAppointments } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();

// Add routes here

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', doctorLoginHandler);
doctorRouter.get('/appointments', authDoctor, doctorAppointments);
doctorRouter.post('/complete-appointment', authDoctor, completedAppointments);
doctorRouter.post('/cancel-appointment', authDoctor, cancelledAppointments);

export default doctorRouter;
