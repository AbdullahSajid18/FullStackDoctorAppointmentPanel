import { useContext, useEffect } from "react";
import { DoctorContext } from "../../Context/DoctorContext";

const DoctorAppointments = () => {
  const { dToken, appointments, getAllAppointments } =
    useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAllAppointments();
    }
  }, [dToken]);

  return (
    <div>
      <p>All Appointments</p>

      <div>

        <div>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>



      </div>




    </div>
  );
};

export default DoctorAppointments;
