
import React from 'react';

export const Chairman = ({ images = [], onClick }) => {
  // Use the first image from the images array or fallback to a placeholder
  const imageSrc = images.length > 0 ? images[0] : '';

  return (
    <section className="p-2 center flex-col" onClick={onClick} style={{ cursor: 'pointer' }}>
      <h2 className='text-[18px] mb-4'></h2>
      <div className='rounded-md  max-w-lg w-full max-h-[315px] h-full overflow-hidden'>
        <div className='p-2 rounded-md flex flex-col justify-center items-center h-full'>
          {imageSrc && (
            <img
              src={imageSrc} 
              alt="Chairman 90th Birthday"
              className="cursor-pointer shadow-lg object-cover w-full h-auto" // Adjust height and add margin
            />
          )}
          <div className='text-light_yellow font-bold bg-dark_gray w-full text-center h-[85px] flex items-center justify-center'>
            <p>CHAIRMAN 90TH BIRTHDAY 2022</p>
          </div>
        </div>
      </div>
    </section>
  );
};
