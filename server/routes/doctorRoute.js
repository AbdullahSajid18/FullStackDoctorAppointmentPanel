import express from 'express'
import { doctorAppointments, doctorList, doctorLoginHandler } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();

// Add routes here

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', doctorLoginHandler);
doctorRouter.get('/appointments', authDoctor, doctorAppointments);


export default doctorRouter;
