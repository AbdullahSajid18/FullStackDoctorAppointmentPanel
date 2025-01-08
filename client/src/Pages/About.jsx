import { assets } from "../assets/assets_client/assets";

const About = () => {
  return (
    <div>
      <div className="pt-10 text-2xl text-center text-gray-500">
        <p>
          ABOUT <span className="font-medium text-gray-700">US</span>
        </p>
      </div>

      <div className="flex flex-col gap-12 my-10 md:flex-row ">
        <img
          className="w-full md:max-w-[360px] "
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 text-sm text-gray-600 md:w-2/4">
          <p>
            Welcome to Prescripto, your trusted platform for seamless healthcare
            access. Our mission is to bridge the gap between patients and
            healthcare professionals, making it easier than ever to find and
            book appointments with top-rated doctors. With a user-friendly
            interface and an extensive network of specialists, we empower
            individuals to take control of their health with just a few clicks.
          </p>
          <p>
            At Prescripto, we prioritize your convenience and peace of mind.
            Whether you need a general check-up, a specialist consultation, or
            urgent care, our platform provides comprehensive options tailored to
            your needs. We collaborate with experienced and certified healthcare
            professionals to ensure that you receive the highest quality of
            care. Through advanced search filters, verified reviews, and
            real-time availability, we aim to make your healthcare journey
            stress-free and efficient.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            As we continue to grow, our commitment remains unwavering: to
            revolutionize the way people access healthcare. Join us on this
            journey to a healthier future—where scheduling a doctors appointment
            is no longer a hassle but a step toward better well-being.
          </p>
        </div>
      </div>

      <div className="my-4 text-xl">
        <p>
          WHY <span className="font-semibold text-gray-700 ">CHOOSE US</span>
        </p>
      </div>

      <div className='flex flex-col mb-20 md:flex-row'>
        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-16 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
          <b>Efficiency:</b>
          <p>Streamlined Appointment Scheduling That Fits Your Busy Lifestyle.</p>
        </div>

        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-16 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
          <b>Convenience:</b>
          <p>Access To A Network Of Trusted Healthcare Professionals In Your Area.</p>
        </div>

        <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-16 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
          <b>Personalization:</b>
          <p>Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
