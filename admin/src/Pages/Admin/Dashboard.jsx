import { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../Context/AppContext";

const Dashboard = () => {
  const { aToken, getDashboardData, appointmentCancellation, dashboardData } = useContext(AdminContext);
  const {slotDateFormat} = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashboardData();
    }
  }, [aToken]);

  return (
    dashboardData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 p-4 transition-all bg-white border-2 border-gray-100 cursor-pointer min-w-53 hover:scale-105">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.doctors}{" "}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-4 transition-all bg-white border-2 border-gray-100 cursor-pointer min-w-53 hover:scale-105">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.appointments}{" "}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-4 transition-all bg-white border-2 border-gray-100 cursor-pointer min-w-53 hover:scale-105">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.patients}{" "}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white ">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Appointments</p>
          </div>

          <div className="pt-4 border-t-0">
            {dashboardData.latestAppointments.map((item, index) => (
              <div className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100" key={index}>
                <img className="w-10 rounded-full" src={item.doctorData.image} alt="" />
                <div className="flex-1 text-sm">
                  <p className="font-medium text-gtay-800">{item.doctorData.name}</p>
                  <p className="text-gtay-600">{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-xs font-medium text-red-400">Cancelled</p>
                ) : (
                  <img
                    onClick={() => appointmentCancellation(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
