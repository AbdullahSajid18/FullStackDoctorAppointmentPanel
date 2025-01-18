import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// Api for registering a user

const registeringUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if all fields are filled
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    // checking if email is valid
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email Format" });
    }

    // checking if password is strong
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 8 characters long",
      });
    }

    // hashing the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    // saving the user data to the database
    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Creating the token
    const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET);
    res.status(201).json({
      success: "true",
      token,
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Api For Login Of Existing User

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if all fields are filled for user login
    const user = await userModel.findOne({ email });
    //  Verifying User
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    // Verifying Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Creating the token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res
        .status(200)
        .json({
          success: "true",
          token,
          message: "User Logged In Successfully",
        });
    } else {
      res
        .status(400)
        .json({ success: "false", message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Api for getting user Profile Data

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.status(200).json({ success: "true", userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Updating User Profile

const updatingUserProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone ||  !dob || !gender) {
      return res
        .status(400)
        .json({ success: "false", message: "Please fill all the fields" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    //Checking the presence of an image file

    if (imageFile) {
      // uploading the image to cloudinary
      const image = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'})
      const imageUrl = image.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    };

    res
      .status(200)
      .json({ success: "true", message: "User Profile Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Creating Api For Booking an Appointment
const bookingAppointment = async (req, res) => {
  try {
    const {userId, docId, slotDate, slotTime } = req.body;
    
    
    const doctorData = await doctorModel.findById(docId).select('-password');
    // Checking If doctor is available to book an appointment
    if (!doctorData.available) {
      return res.status(400).json({ success: "false", message: "Doctor Not Available" });
    }
    //  In this variable we are storing the appointment data
    let slots_booked = doctorData.slots_booked;

    // Checking for the Slot Availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.status(400).json({ success: "false", message: "Slot Not Available" });
      }else {
        slots_booked[slotDate].push(slotTime);
      }
    }else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select('-password');
    delete doctorData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      doctorData,
      amount:doctorData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    };

    // Saving This Appointment Request To The Database
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Save new slots data in doctorData
    await doctorModel.findByIdAndUpdate(docId, {slots_booked});
    // Generating the Response
    res.status(201).json({ success: "true", message: "Appointment Booked Successfully" });

      

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// Creating Api For Getting All Appointments Of A User
const listAppointment = async (req, res) => {
  try {
    const {userId} = req.body;
    const appointments = await appointmentModel.find({userId})
    res.status(200).json({ success: "true", appointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
    
  }
}


// Creating An Api for the cancellation of Appointment
const appointmentCancellation = async (req, res) => {
  try {
    const {userId, appointmentId} = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // Verifying The appointment of the user
    if (appointmentData.userId !== userId) {
      return res.status(400).json({ success: "false", message: "Unauthorized Action" });
    }
    // updating the appointment
    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});

    // Releasing the slot of Doctor
    const {docId, slotDate, slotTime} = appointmentData;
    const doctorData = await doctorModel.findById(docId)

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



// const stripeInstance =  Stripe({
//   key_id: process.env.STRIPE_PUBLIC_KEY,
//   key_secret: process.env.STRIPE_SECRET_KEY 
// })

// // Api To make a payment Gateway using Razorpay

// const stripePaymentGateway = async (req, res) => {
//   try {
//     const { appointmentId } = req.body;

//     // Fetch the appointment data from the database
//     const appointmentData = await appointmentModel.findById(appointmentId);

//     if (!appointmentData || appointmentData.cancelled) {
//       return res.status(400).json({
//         success: "false",
//         message: "Appointment Cancelled or Not Found",
//       });
//     }

//     // Create a Payment Intent for Stripe
//     const paymentIntent = await stripe.stripeInstance.create({
//       amount: appointmentData.amount * 100, // Amount in cents
//       currency: process.env.CURRENCY || "usd", // Use environment variable or default to USD
//       metadata: { appointmentId }, // Optional metadata
//     });

//     res.status(200).json({
//       success: "true",
//       clientSecret: paymentIntent.client_secret, // Client secret for frontend integration
//       message: "Payment Intent Created Successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };







export { registeringUser, userLogin, getUserProfile, updatingUserProfile, bookingAppointment, listAppointment, appointmentCancellation };
