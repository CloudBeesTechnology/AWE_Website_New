import React from 'react';
import slide1 from "../../assets/home/Events/25 Million Safe Man-Hours Without Lost Time Injury (LTI) Copy.jpeg"

export const LtiMillion = ({ images = [], onClick }) => {
  // Use the first image from the images array or fallback to slide1
  const imageSrc = images.length > 0 ? images[0] : slide1;

  return (
    <section className="p-2 center flex-col" onClick={onClick} style={{ cursor: 'pointer' }}>
      <h2 className='text-[18px] mb-4'></h2>
      <div className='rounded-md  max-w-lg w-full max-h-[315px] h-full overflow-hidden'>
        <div className='p-2 rounded-md flex flex-col justify-center items-center h-full'>
        {imageSrc && (
          <img
            src={slide1}
            alt="LTI Achievement"
            className="cursor-pointer shadow-lg object-fit w-full h-[220px]"
          />
        )}
           <div className='text-light_yellow font-bold bg-dark_gray w-full text-center h-[85px] flex items-center justify-center'>
            <p>25 MILLION HOURS WITHOUT LTI</p>
          </div>
    
        </div>
      </div>
    </section>
  );
};

 
