import React from 'react'
import { CommonBanner } from '../../Component/Organization/CommonBanner';
import bg from "../../assets/about/ValuesNew.jpg";
import image from "../../assets/about/OurGuidingPrinciples.png";
import { useEffect } from 'react';

export const AboutValues = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <section>
      <CommonBanner background={bg} title="Values" />
      <div className="mt-12 px-4 lg:px-52 md:px-42 sm:px-6 screen-size container mx-auto  max-sm:my-14">
        <div className="flex flex-col md:flex-row  custom-gradient rounded-lg shadow-lg">

          {/* Left Column (Our Values) */}
          <div className="w-full md:w-1/2  p-8 rounded-l-lg  border-[grey]">
            <h2 className="text-[32px] font-extrabold mb-4">OUR VALUES</h2>
            <p className="ml-6 text-[20px] font-semibold">We believe in :</p>
            <div className="ml-6 mt-2 space-y-2">
              <p className='flex flex-col text-[20px]  gap-2 pt-2 font-bold'>SAFETY<span className='text-[17px] font-medium'>Protecting our employees,<br /> assets & environment</span></p>
              <p className='flex flex-col text-[20px]  gap-2 pt-3 font-bold'>QUALITY<span className='text-[17px] font-medium'>Meeting requirements</span> </p>
              <p className='flex flex-col text-[20px]  gap-2 pt-3 font-bold'>COMMITMENTS<span className='text-[17px] font-medium'>Keeping Promises</span> </p>
              <p className='flex flex-col text-[20px]  gap-2 pt-3 font-bold'>INTEGRITY<span className='text-[17px] font-medium'>Adhering to ethical standards</span></p>
            </div>

            <h2 className="text-[32px] font-extrabold mt-8 mb-4">OUR GOALS</h2>
            <ul className="text-[17px] font-semibold ml-6 space-y-4">
              <li>Target Zero-Continuous Health, <br /> Safety & Environment Improvements.</li>
              <li>On-Time delivery and as bid performance.</li>
              <li>Zero ethics violations.</li>
            </ul>
          </div>

          {/* Right Column (Our Guiding Principles) */}
          <div className="w-full md:w-1/2  p-8 rounded-r-lg max-sm:pt-5">
            <div className="flex justify-center ">
              <img
                src={image} 
                alt="Guiding Principles"
                className="rounded-lg w-[440px] max-sm:w-full h-[368px] max-sm:h-full"
              />
            </div>                                                       
            <p className="font-semibold text-[20px] mb-5 mt-6">To be the Professional Contractor of Choice</p>
            <div className="ml-6 grid sm:grid-cols-2 gap-4 text-[17px] font-semibold">
              <div>Professionalism</div>
              <div>Motivation</div>
              <div>Competency</div>
              <div>Promoting Diversity</div>
              <div>Leading by Example</div>
              <div>Promoting Team Work</div>
              <div>Effective Communication</div>
              <div>Developing Employees</div>
              <div>Positive Attitude</div>
              <div>Enjoying our Work</div> 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

