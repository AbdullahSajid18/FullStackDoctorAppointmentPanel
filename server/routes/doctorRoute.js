import express from 'express'
import { doctorList, doctorLoginHandler } from '../controllers/doctorController.js';

const doctorRouter = express.Router();

// Add routes here

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', doctorLoginHandler);


export default doctorRouter;
