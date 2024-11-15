import React from 'react';
import bg from "../../assets/about/AboutNew.jpg";
import image from "../../assets/about/AboutImg.jpg";
import { CommonBanner } from '../../Component/Organization/CommonBanner';
import { TeamImage } from '../../Component/Organization/TeamImage';
import { useEffect } from 'react';

export const About = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <section>
        <CommonBanner background={bg} title="About Us" />

        <section className="px-12 screen-size mx-auto my-10">
          <div className="bg-white lg:px-10">
            {/* Title */}
            <div className="mb-8">
              <h2 className="text-center rounded text-[28px] max-sm:text-[20px] font-semibold bg-[#FEF116] max-sm:w-full w-[250px] p-3">
                Who we are...
              </h2>
            </div>

            {/* Content Section */}
            <div className="lg:flex lg:justify-between lg:gap-20">
              {/* Text Content */}
              <div className="text-[16px] max-sm:text-[14px] lg:w-3/3">
                <p className=" mb-4">
                  ADININ WORKS & ENGINEERING SDN BHD (AWE) was established in 1980 and is a
                  member of the Adinin Group of Companies (AGC)
                </p>
                <p className=" mb-4">
                  It grew from a modest machining business to being one of the country's most professional and
                  successful mechanical contractors having the capacity to carry out major projects such as
                  fabrication of offshore structures, maintenance of plants and EPC Contracts.
                </p>
                <p className=" mb-4">
                  In this periods, AWE is proud to have successfully provided support and services to Brunei
                  Shell Petroleum Company,Sdn, Bhd. (BSP), Brunei Liquefied Natural Gas Company (BLNG), Brunei
                  Methanol company(BMC), Brunei Government and Total E&P Borneo.
                </p>
                <p className=" mb-4">
                  AWE has the distinction of being the first local company to have successfully performed an EPC
                  project for the Industrial Gas Terminal and fabricated CONTAINERIZED room, offshore
                  Platforms and living quarters for BSP in Brunei Darussalam.

                </p>
                <p className=" mb-4">
                  Also being the planning, logistical and manpower partner for the world first change out of the
                  four Main Cryogenic Heat Exchangers (MCHE) for BLNG.

                </p>
              </div>

              {/* Image Section */}
              <div className="lg:w-full center flex-col gap-4 mt-8 lg:mt-0">
                {/* First Image */}
                <div className="relative">
                  <img
                    src={image}
                    alt="Offshore Fabrication"
                    className="object-cover w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

    </>

  );
};


