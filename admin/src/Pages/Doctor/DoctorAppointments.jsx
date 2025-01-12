import { useContext, useEffect } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { AppContext } from "../../Context/AppContext";

const DoctorAppointments = () => {
  const { dToken, appointments, getAllAppointments } = useContext(DoctorContext);
  const {calculateAge, slotDateFormat} = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAllAppointments();
    }
  }, [dToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>Doctor Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll '>

        <div className='grid max-sm:hidden grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b '>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointments.map((item, index)=> (
            <div key={index}>
              <p>{index + 1}</p>
              <div>
                <img src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
              </div>
              <div>
                <p>{item.payment ? 'Online' : 'Cash'} </p>
              </div>
              <p>{calculateAge(item.userData.dob)} </p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime} </p>
            </div>
          ))
        }



      </div>




    </div>
  );
};

export default DoctorAppointments;
