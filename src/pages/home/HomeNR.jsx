import React from 'react';
import { Link } from 'react-router-dom';

export const HomeNR = () => {

  const content = [
    { type: 'Aspiration', text: 'We aim to create a safe and ethical environment by protecting our people and resources, keeping our promises, and continually improving health, safety, and performance.' },
    { type: 'Vision', text: 'We want to be the contractor of choice by delivering quality services, supporting employee growth, ensuring strong returns for investors, building trust with financiers and suppliers, and fostering partnerships for shared success.' },
    { type: 'Mission', text: 'We focus on better serving our customers, helping employees reach their full potential, and building lasting relationships with partners, suppliers, and financiers.' }
  ];


  const mainContent = {
    heading: "Empowering Industry with Excellence Since 1980",
    description: "We grew from a modest machining business to being one of the country's most professional and successful mechanical contractors having the capacity to carry out major projects such as fabrication of offshore structures, maintenance of plants and EPC Contracts."
  };

  return (
    <>
      <section className="screen-size relative bg-bottom">
        <div className="relative z-10 flex flex-col lg:flex-row border gap-12 max-sm:gap-4 justify-between items-start lg:items-center p-8 lg:p-16">

          {/* Left Section - Main Heading */}
          <div className="font-poppins text-white">
            <div className='max-sm:text-center text-4xl font-poppins font-extrabold'>{mainContent.heading}</div>
            <div className="mt-8 text-[12px] font-poppins sm:text-[14px]">{mainContent.description}</div>
            <div className='mt-16 max-sm:mt-6 max-sm:center'>
              <Link to="/about" className='rounded-md py-4 px-6 text-black font-lg w-[211px] h-[56px] bg-[#FEF116]'>DISCOVER MORE</Link>
            </div>
          </div>

          {/* Right Section - Aspiration, Vision, Mission */}
          <div className="text-white lg:mt-0 space-y-4 lg:space-y-14 ">
            {content.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="rounded-full px-4 py-2 center text-[14px] bg-white text-dark_red">❯</div>

                <div className="ml-4">
                  <h3 className="text-xl sm:text-[24px] font-semibold">{item.type}</h3>
                  <p className="text-[14px] sm:text-[16px] mt-2 sm:mt-4">
                    {item.text}
                    {item.type === 'Aspiration' && (
                      <span className='font-poppins text-[14px] text-yellow border-b'>
                        <Link to="/values"> Read More...</Link>
                      </span>
                    )}
                    {item.type === 'Vision' && (
                      <span className='font-poppins text-[14px] text-yellow border-b'>
                        <Link to="/ourMission"> Read More...</Link>
                      </span>
                    )}
                    {item.type === 'Mission' && (
                      <span className='font-poppins text-[14px] text-yellow border-b'>
                        <Link to="/ourMission"> Read More...</Link>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
