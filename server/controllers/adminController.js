import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

// API for Adding Doctor 

const addDoctor = async (req, res) => {

    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;
        
        // check if all fields are filled for adding the doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({success:'false', message: "All fields are required" });
        }

        // validating the email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({success:'false', message: "Invalid email format" });            
        }

        // validating the password strength
        if (password.length < 8) {
            return res.status(400).json({success:'false', message: "Password must be atleast 8 characters long" });            
        }
        
        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Uploading the image to cloudinary
        const uploadedImage = await cloudinary.uploader.upload(imageFile.path,{resource_type: 'image'} );
        const imageUrl = uploadedImage.secure_url;

        // creating the doctor data
        const doctorData = {
            name,
            email,
            image:imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date: Date.now() 
        };

        // saving the doctor data to the database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({success:'true', message: "Doctor Added Successfully" });

 
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
        
    }
};

// API For Admin Login

const adminLogin = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        // check if all fields are filled for admin login
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.status(200).json({success:'true', token, message: "Admin Logged In Successfully" });
        } else {
            res.status(400).json({success:'false', message: "Invalid Credentials" });
        }
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message});
        
    }
}; 

// API to get all doctors list for admin panel

const allDoctors = async (req, res) => {
    try {
         
        const doctors = await doctorModel.find({}).select('-password');
        res.status(200).json({success:'true', doctors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
        
    }
}

// Api to get all appointment list
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.status(200).json({success:'true', appointments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
        
    }
}

// Api for cancelling an appointment by admin
const cancellationOfAppointment = async (req, res) => {
    try {
      const {appointmentId} = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);
      // updating the appointment
      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});
  
      // Releasing the slot of Doctor
      const {docId, slotDate, slotTime} = appointmentData;
      const doctorData = await doctorModel.findById(docId);
  
      let slots_booked = doctorData.slots_booked;
  
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
      await doctorModel.findByIdAndUpdate(docId, {slots_booked});
      // Generating the Response
      res.status(200).json({ success: "true", message: "Appointment Cancelled Successfully" });
  
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
};


// Creating An to Get Dashboard data for Admin Panel
const adminDashboard = async (req, res) => {
    try {


        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashboardData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0 , 5)  
        };
        // Generating Response
        res.status(200).json({ success: "true", dashboardData });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


export { addDoctor, adminLogin, allDoctors, appointmentsAdmin, cancellationOfAppointment, adminDashboard};