// import React from 'react'

import { assets } from "../assets/assets_client/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        
        {/* ------- Left Section ------- */}
        <div>
          <img className="w-40 mb-5 " src={assets.logo} alt="" />
          <p className="w-full leading-6 text-gray-600 md:w-2/3">
            We are dedicated to providing seamless doctor appointment booking
            services. With a wide network of trusted healthcare professionals,
            we ensure you receive timely care at your convenience.
          </p>
        </div>

        {/* ------- Middle Section ------- */}
        <div>
          <p className='mb-5 text-xl font-medium '>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li >Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* ------- Right Section ------- */}
        <div>
          <p className="mb-5 text-xl font-medium ">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600 ">
            <li>+1-212-456-7890</li>
            <li>meriumsheikh@gmail.com</li>
          </ul>
        </div>
      </div>

        {/* ------- Copyright Text ------- */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">CopyRight 2024@ Merium Sheikh - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
