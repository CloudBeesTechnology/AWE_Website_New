import React from 'react';
import calendar from "../../assets/contact/Vector.svg";

export const BusinessHours = () => {
  return (
    <div className="screen-size flex flex-col items-center justify-center mt-6">
      
      {/* Heading */}
      <h2 className="text-[30px] max-sm:text-[20px] font-semibold mb-6">Business Hours</h2>
      <h3 className="text-[30px] max-sm:text-[20px]-semibold mb-2">Head Office:</h3>

      {/* Business Hours Grid */}
      <div className="flex justify-center gap-4 max-w-4xl w-full bg-white sm:p-6 ">
       
        {/* Head Office Hours */}
        <div className="relative p-4" style={{ backgroundImage: `url(${calendar})`, width: "100%", maxWidth: "384px", height: "340px", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className='mt-24'>

            <p className='text-center text-[18px] max-sm:text-[14px] font-medium'>Monday – Friday</p>
            <div className="flex justify-center">
              <div className="border-b-4 border-[#F63C3C] w-[150px] sm:w-[175px] mt-2"></div>
            </div>

            <div className='flex flex-col items-center mt-2'>
              <p className='text-[18px] max-sm:text-[14px]'><i>0730 hrs  1200 hrs</i></p>
              <p className='text-[18px] max-sm:text-[14px]'><i>1300 hrs  1630 hrs</i></p>
              <br />
              <div>
                <p className='text-start text-[18px] max-sm:text-[14px] font-semibold'>Saturday</p>
                <p className='text-[18px] max-sm:text-[14px] mt-2'><i>0730 hrs  1200 hrs</i></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


