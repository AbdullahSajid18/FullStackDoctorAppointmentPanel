import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const changeAvailability = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctorData = await doctorModel.findById(doctorId);
    await doctorModel.findByIdAndUpdate(doctorId, {
      available: !doctorData.available,
    });
    res
      .status(200)
      .json({ success: "true", message: "Availability Changed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Creating an Api for Doctor Login

const doctorLoginHandler = async(req, res) => {
  try {
    const {email, password} = req.body;
    const doctor = await doctorModel.findOne({email});
    // Checking if The doctor is available or not
    if (!doctor) {
      return res.status(404).json({success: false, message: "Doctor not found"});
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if(isMatch) {
      const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET);
      return res.status(200).json({success: true, message: "Login Successful", token, doctor});
    } else  {
      return res.status(401).json({success: false, message: "Invalid Credentials"});
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });  
  }
};

export { changeAvailability, doctorList, doctorLoginHandler };
