import React from 'react';
import bg from "../../assets/about/aboutUS.jpg";
// import image1 from "../../assets/about/image 10.png";
// import image2 from "../../assets/about/imag11.png";
import { CommonBanner } from '../../Component/Organization/CommonBanner';
import { useEffect } from 'react';
export const OurVision = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  
  return (
    <section>
            <CommonBanner background={bg} title="Vision" />

    <div className="screen-size bg-white pb-10 pt-16 sm:py-16 px-2 lg:px-10">
      {/* Title */}
      <div className="mb-8 ">
        <h2 className="text-[28px] font-semibold bg-[#FEF116] text-center w-[200px] p-3">
          Our Vision...
        </h2>
      </div>
      
      {/* Content Section */}
      <div className="lg:flex lg:justify-between lg:gap-12">
        {/* Text Content */}
        <div className="lg:w-2/3">
          <h3 className="sm:text-[30px] text-[24px] font-medium mb-4 max-sm:text-center">
            To be the professional contractor of choice
          </h3>
          
          <ul className="space-y-4 ">
            <li>
              <div className="flex items-start gap-2">
                <span className="text-dark_red ">⦿</span>
                <div>
                  <p className="font-medium text-[20px] mb-2">TO OUR CUSTOMERS</p>
                  <p>We deliver consistent services and excellent solutions.</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-start gap-2">
                <span className="text-dark_red">⦿</span>
                <div>
                  <p className="font-medium text-[20px] mb-2">TO OUR EMPLOYEES</p>
                  <p >We are an environment where employees feel secure to release their aspirations.</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-start gap-2">
                <span className="text-dark_red">⦿</span>
                <div>
                  <p className="font-medium text-[20px] mb-2">TO OUR INVESTORS</p>
                  <p>We achieve attractive shareholder returns.</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-start gap-2">
                <span className="text-dark_red">⦿</span>
                <div>
                  <p className="font-medium text-[20px] mb-2">TO OUR FINANCIERS</p>
                  <p>We are a growing, well-managed, and diversified business entity.</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-start gap-2">
                <span className="text-dark_red">⦿</span>
                <div>
                  <p className="font-medium text-[20px] mb-2">TO OUR SUPPLIERS</p>
                  <p>We honor our commitment and we are a vehicle for their long-term growth.</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-start gap-2">
                <span className="text-dark_red">⦿</span>
                <div>
                  <p className="font-medium text-[20px] mb-2">TO OUR BUSINESS PARTNERS</p>
                  <p>We are trustworthy to our partners to achieve their business goals.</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Image Section */}
        {/* <div className="lg:w-1/3 center md:flex-col gap-4 mt-8 lg:mt-0">
          <div className="relative">
            <img 
              src={image1}
              alt="Contractor Image 1" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          
\          <div className="relative">
            <img 
              src={image2} 
              alt="Contractor Image 2" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div> */}
      </div>
    </div>    </section>

  );
};

