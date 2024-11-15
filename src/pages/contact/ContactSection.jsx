import React from "react";
import image2 from "../../assets/contact/image6.png";
import bg from "../../assets/image capture/contact1.png";
import { CommonBanner } from "../../Component/Organization/CommonBanner";

export const ContactSection = () => {
  return (
    <section>
      <CommonBanner background={bg} title="Contact Us" />
      <div className="screen-size flex flex-col items-center justify-center lg:py-8 py-4">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-[40px] max-sm:text-[20px] text-[#303030] font-semibold ">
            Get in touch with us
          </h1>
          <p className="text-[18px] max-sm:text-[14px] text-[#303030] font medium">
            We would like to know more about the needs of your business.
          </p>
        </div>

        <div className="px-2 gap-4 lg:px-16 flex justify-evenly items-center w-full max-[900px]:flex-col max-[900px]:w-full">
          {/* Left Image Section */}
          <div className="w-full sm:w-2/4 flex items-center">
            <img
              src={image2}
              alt="Office"
              className="w-[552px] h-[350px] rounded-lg shadow-md object-cover"
              // style={{ width: '552px' , height: '342px' }}
            />
          </div>

          {/* Right Map Section */}
          <div className="w-full sm:w-2/4 flex items-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.0923023672653!2d114.19749617413386!3d4.577441895397145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3218ab891ae36e25%3A0xc6202b85ab025a0!2sADININ%20WORKS%20%26%20ENGINEERING%20SDN%20BHD%20(OFFICIAL)!5e0!3m2!1sen!2sin!4v1728113031914!5m2!1sen!2sin"
              className=" w-[552px] h-[350px] rounded-lg shadow-md object-cover"
              // style={{ width: '552px' , height: '342px' }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
