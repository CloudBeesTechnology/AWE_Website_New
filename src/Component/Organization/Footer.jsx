import React, { useState, useEffect } from "react";
import image from "../../assets/footer/fbNew.png";
import image1 from "../../assets/footer/instaNew.png";
import image2 from "../../assets/footer/linkedinNew.png";
import leftArrow from "../../assets/machines/leftarrow.png";
import rightArrow from "../../assets/machines/rightarrow.png";
import { FooterData } from "./FooterData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import image34 from "../../assets/logo/logo.png";
import cbtlog from "../../assets/footer/cbtlog.png";
import "swiper/css";
import "swiper/css/pagination";

export const Footer = () => {
  return (
    <>
      <article className="mt-12 flex justify-center items-center gap-3 text-[#303030] text-[16px] max-sm:text-[14px] font-medium">
        <p className="text-center  px-7">
          <span className="relative">
            <img
              className="max-w-[30px] absolute top-0 -left-9 w-full"
              src={leftArrow}
              alt="left arrow not found"
            />
            Being
          </span>{" "}
          one of the country's most professional and successful mechanical
          contractors having the capacity to carry out major
          <span className="relative pl-1">
            projects.
            <img
              className="max-w-[30px] w-full absolute top-0 -right-10"
              src={rightArrow}
              alt="right arrow not found"
            />
          </span>
        </p>
      </article>
      <section className="flex flex-col sm:space-y-12 space-y-7 bg-[#313038] mt-12">
        <section className="flex flex-col space-y-12 bg-[#313038]">
          <div className="px-4  flex max-sm:flex-col  flex-wrap justify-center sm:justify-evenly gap-5 sm:gap-12 mt-12">
            {/* Logo Section */}
            <div className="text-white text-center">
              <img
                src={image34}
                className="w-24 h-24 mx-auto mb-4"
                alt="logo"
              />
              <h1 className=" capitalize italic  font-semibold text-[18px] sm:text-[20px] lg:font-bold">
                The professional
                <span className="block">contractor of choice</span>
              </h1>
            </div>

            {/* Quick Links Section */}
            <div className="text-center lg:text-start">
              <h1 className="text-white  font-semibold text-[18px] sm:text-[20px] sm:font-bold">
                Quick Links
              </h1>
              <div className="flex justify-center lg:justify-start">
                <div className="border-b-4 border-light_yellow w-[80px] mt-1"></div>
              </div>
              <ul className="text-[16px] sm:text-[18px] font-lg text-white mt-4">
                <li className="py-1">
                  <Link to="/about" className="text-white">
                    About us
                  </Link>
                </li>
                <li className="py-1">
                  <Link to="/OurService" className="text-white">
                    Services
                  </Link>
                </li>
                <li className="py-1">
                  <Link to="/gallery" className="text-white">
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media Section */}
            <div className="text-center">
              <h1 className="text-white ] font-semibold text-[18px] sm:text-[20px] sm:font-bold">
                Social Media
              </h1>
              <div className="flex justify-center">
                <div className="border-b-4 border-light_yellow w-[80px] lg:w-[120px] mt-2"></div>
              </div>
              <div className="flex justify-center gap-3 lg:gap-6 mt-5 sm:mt-8">
                <Link
                  to="https://www.facebook.com/profile.php?id=100093301044365&mibextid=LQQJ4d"
                  target="_blank"
                  className="center gap-2 "
                >
                  <img
                    className="object-cover w-[34px] sm:w-[46px] h-auto"
                    src={image}
                    alt={`not found`}
                  />
                </Link>
                <Link
                  to="https://www.instagram.com/awe_adininworks?igsh=MTZnZWthYzg1cGNrZA%3D%3D&utm_source=qr"
                  target="_blank"
                  className="center gap-2"
                >
                  <img
                    className="object-cover w-[34px] sm:w-[46px] h-auto"
                    src={image1}
                    alt={`not found`}
                  />
                </Link>
                <Link
                  to="https://www.linkedin.com/company/adinin-works-&-engineering-sdn-bhd/"
                  target="_blank"
                  className="center gap-2"
                >
                  <img
                    className="object-cover w-[34px] sm:w-[46px] h-auto"
                    src={image2}
                    alt={`not found`}
                  />
                </Link>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="text-center lg:text-start max-sm:mt-5">
              <h1 className="text-white font-semibold text-[18px] sm:text-[20px] sm:font-bold">
                Contact information
              </h1>
              <div className="flex justify-center lg:justify-start">
                <div className="border-b-4 border-light_yellow w-[80px] lg:w-[94px]  mt-2"></div>
              </div>
              <address className="text-[16px] sm:text-[18px] text-white mt-4 sm:mt-6">
                F118, 1st Floor, Komplek Harapan, <br />
                Lot 3038, Jalan Setia Di-Raja,
                <br />
                Kuala Belait KA3131,
                <br />
                Brunei Darussalam
                <br />
                Tel: +673 3331001
                <br />
                Fax: +673 3334543
              </address>
            </div>
          </div>
        </section>

        <div className="bottom max-w-screen-2xl w-[95%] mx-auto ">
          <Swiper
            className="w-full"
            modules={[Pagination, Autoplay]}
            spaceBetween={5}
            slidesPerView={6}
            loop={true}
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            speed={1500}
          >
            <div className="center overflow-hidden">
              {FooterData.map((val, index) => (
                <SwiperSlide key={index}>
                  <div className="center">
                    <div className="max-w-[180px] h-[170px] max-sm:h-[120px]">
                      <img
                        className="object-cover w-full h-full "
                        src={val.img}
                        alt={`${index} not found`}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>

        <div className="border-t border-light_yellow text-[14px] sm:text-[16px] text-white">
          <div className="flex justify-between items-center flex-wrap gap-3 max-sm:justify-center mt-2 text-center max-w-screen-2xl w-[95%] mx-auto p-2">
            <article className="space-x-3">
              <span>Terms & Conditions</span>
              <span>|</span>
              <span>Privacy Policy</span>
            </article>

            <article>
              <p>Copyright © 2024 Adinin Works & Engineering Sdn Bhd</p>
            </article>

            {/* <article className="flex items-center max-sm:flex-col">
              <span className="max-sm:text-[12px]">Developed by </span>
              <span className="mx-2"></span>
              <a href="https://cloudbeestech.com/">
                {" "}
                <img
                  src={cbtlog}
                  className="w-auto h-7 max-w-[300px] max-sm:w-[120px] max-h-[100px] max-sm:h-[24px]"
                  alt="CloudBees Technologies Logo"
                />
              </a>
            </article> */}
            <article className="flex items-center max-sm:flex-col">
              <span className="max-sm:text-[12px]">Developed by </span>
              <span className="mx-2"></span>
              <span className="relative group">
                <a href="https://cloudbeestech.com/" target="_blank" rel="noopener noreferrer">
                  <img
                    src={cbtlog}
                    className="w-auto h-7 max-w-[300px] max-sm:w-[120px] max-h-[100px] max-sm:h-[24px]"
                    alt="CloudBees Technologies Logo"
                  />
                </a>
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-4 max-sm:mb-3 w-max rounded bg-gray-700 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Visit CloudBees Tech
                </span>
                
              </span>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};
// make this responsive, the text have to same while smalling the screen its breaking lines
