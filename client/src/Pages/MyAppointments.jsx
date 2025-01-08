import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {

  const { backendUrl , token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("/");
    return dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2];
  }

  const getUserAppointments = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/user/appointments`, {headers:{token}});
      
      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message)
      
    }
  };


  // Appointment Cancellation Functionality
  const appointmentCancellation = async (appointmentId) => {
    try {
      const {data} = await axios.post(`${backendUrl}/api/user/cancel-appointment`, {appointmentId}, {headers:{token}})
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      }else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message)
    }
  };



  useEffect(()=> {
    if (token) {
      getUserAppointments();
    }
  }, [token])

  return (
    <div>
        <p className='pb-3 mt-12 font-medium border-b text-zinc-700' >My Appointments</p>
        <div>
            {appointments.map((item, index)=> (
              <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                   <div>
                    <img className='w-32 bg-indigo-50' src={item.doctorData.image} alt="" />
                   </div>
                   <div className='flex-1 text-sm text-zinc-600'>
                    <p className='font-semibold text-neutral-800'>{item.doctorData.name}</p>
                    <p>{item.doctorData.speciality} </p>
                    <p className='mt-1 font-medium text-zinc-700'>Address:</p>
                    <p className='text-sm'>{item.doctorData.address.line1} </p>
                    <p className='text-sm'>{item.doctorData.address.line2} </p>
                    <p className='mt-1 text-xs'><span className='text-sm font-medium text-neutral-700' >Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime} </p>
                   </div>
                   <div></div>
                   <div className='flex flex-col justify-end gap-2' >
                    {!item.cancelled && <button className='py-2 text-sm text-center transition-all duration-300 border rounded text-stone-500 sm:min-w-48 hover:bg-primary hover:text-white'>Pay Online</button> } 
                    {!item.cancelled && <button onClick={()=> appointmentCancellation(item._id)} className='py-2 text-sm text-center transition-all duration-300 border rounded text-stone-500 sm:min-w-48 hover:bg-red-600 hover:text-white'>Cancel Appointment</button>} 
                    {item.cancelled && <button className='py-2 text-red-500 border border-red-500 rounded sm:min-w-48' >Appointment Cancelled</button>}
                   </div>
              </div>
            )) }
        </div>
    </div>
  )
}

export default MyAppointments