import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { AppContext } from '../../Context/AppContext';

const DoctorProfile = () => {

  const {dToken, profileData, setProfileData, getProfileData} = useContext(DoctorContext);
  const {currency, backendUrl} = useContext(AppContext); 

useEffect(()=>{
  if (dToken) {
    getProfileData();
  }
}, [])

  return profileData && (
    <div>
        
      <div>
        <div>
          <img src={profileData.image} alt="" />
        </div>

        <div>
          {/* Doc Info : name, degree, experience */}

          <p>{profileData.name}</p>
          <div>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button>{profileData.experience} </button>
          </div>

          {/* Doctor About */}
          <div>
            <p>About:</p>
            <p>
              {profileData.about}
            </p>
          </div>
        </div>
        
      </div>

    </div>
  )
}

export default DoctorProfile