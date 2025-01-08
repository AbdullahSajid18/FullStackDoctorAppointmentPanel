import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Replace with your backend URL.



  // function to get all the doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-doctors`,
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // function to change the availability of the doctor

  const changeAvailability = async (doctorId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { doctorId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const getAllAppointments = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/admin/appointments`, {headers: {aToken}});
      if(data.success){
        setAppointments(data.appointments);
        console.log(data.appointments);
        
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  const appointmentCancellation = async (appointmentId) => {
    try {
      const {data} = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, {appointmentId}, {headers:{aToken}});
      if(data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      
    }
  }

  const getDashboardData = async () => {
    try {

      const {data} = await axios.get(`${backendUrl}/api/admin/dashboard`, {headers:{aToken}});
      if(data.success) {
        setDashboardData(data.dashboardData);
        console.log(data.dashboardData);
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
      
    }
  }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    appointmentCancellation,
    dashboardData,
    getDashboardData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
