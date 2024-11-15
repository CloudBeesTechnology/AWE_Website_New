import React from 'react';
import image from "../../assets/home/homeImg-2.png"
import image1 from "../../assets/home/iconCertify.png"
import { TiTickOutline } from "react-icons/ti";


export const HomeCertify= () => {
  return (
    <section className='bg-white screen-size sm:my-16 my-10'>
      <h2 className="text-dark_red sm:my-10 mb-5 text-[20px] text-center sm:text-[34px] font-semibold relative"><span className=' sm:absolute sm:w-[350px] sm:h-4 sm:top-11  sm:border-b-4 border-dark_red '></span>
      Powering a Sustainable Future</h2>
      <div className=" flex items-center justify-evenly max-[1030px]:flex-col w-full  gap-10 ">
          {/* Left Image Section */}
      <div className="  ">
        <img
          src={image} 
          alt="Energy"
          className="w-[500px]  h-auto "
        />
      </div>

      <div className=" sm:h-[350px] center flex-col md:text-left ">
      <h2 className="text-2xl w-full font-bold max-sm:text-center max-sm:font-medium max-sm:text-[20px]">
          Providing affordable and reliable energy
        </h2>
        <p className=" mt-5 w-full text-start max-sm:text-center max-sm:font-medium max-sm:text-[18px]">
          Clean energy isn't just about environmentalism.
        </p>
        <div className='flex w-full flex-wrap gap-10 max-sm:justify-center  items-center mt-7'>
             {/* Company Info */}
        <div className="w-[150px] h-[150px] center flex-col bg-white border-2 border-dark_red p-2 rounded-md text-center">
            <img
              src={image1} 
              alt="Company certify img"
              className="w-12 h-12 mx-auto "
            />
            <p className="text-sm font-semibold max-sm:font-medium max-sm:text-[14px] mt-2">We're No. 1 Oil & Gas Company</p>
          </div>
       <div>

      {/* Right Text Section  & Button*/}
        {/* Bullet points */}
        <ul className=" space-y-3 max-sm:font-medium max-sm:text-[14px] ">
          <li className="flex items-center space-x-2">
            <span className="text-dark_red font-bold "><TiTickOutline/></span>
            <span>Clean energy for a bright future</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-dark_red font-bold"><TiTickOutline/></span>
            <span>Sustainable development</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-dark_red font-bold"><TiTickOutline/></span>
            <span>Improving access to energy</span>
          </li>
        </ul>
       <div className='max-sm:text-center'> <button className="text-[16px]  bg-yellow  px-5 py-2 my-3">
            READ MORE
          </button></div>
       </div>
        </div>
   
      </div>
    </div>
    </section>
 
  );
};


