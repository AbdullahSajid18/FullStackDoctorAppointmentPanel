/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";


const RelatedDoctors = ({speciality, docId}) => {

    const navigate = useNavigate();
    const {doctors} = useContext(AppContext);

    const [relatedDoctors, setRelatedDoctors] = useState([]);

    useEffect(()=> {
        if (doctors.length > 0 && speciality) {
            const filteredDoctors = doctors.filter((doc)=> doc.speciality === speciality && doc.id !== docId);
            setRelatedDoctors(filteredDoctors);
        }
    }, [doctors, speciality, docId])


  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors To Book</h1>
        <p className='text-sm text-center sm:w-1/3'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='grid w-full gap-4 px-3 pt-5 grid-cols-auto gap-y-6 sm:px-0'>
            {relatedDoctors.slice(0,5).map((item,index)=>(
                <div onClick={()=> {navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='overflow-hidden border border-blue-200 cursor-pointer rounded-xl hover:translate-y-[-10px] transition-all duration-500' key={index}>
                    <img className='bg-blue-50' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                        <p className='text-lg font-medium text-gray-900'>{item.name}</p>
                        <p className='text-sm text-gray-600'>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={()=>{ navigate('/doctors'); scrollTo(0,0)}} className='px-12 py-3 mt-10 text-gray-600 bg-gray-300 rounded-full '>more</button>
    </div>
  )
}

export default RelatedDoctors