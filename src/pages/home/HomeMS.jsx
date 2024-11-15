import React from "react";
import { services } from "./HomeDataDetails";

export const HomeMS = () => {
  return (
    <div className="text-center screen-size center flex-col mb-10  md:px-24">
      <h2 className="mb-5 text-black sm:my-10  text-[20px] text-center sm:text-[34px] font-semibold relative">
        <span className="w-full sm:w-[200px] sm:h-4 sm:top-11 sm:border-b-4 border-dark_red"></span>
        Our Services
      </h2>
      <div>
        <div className="max-sm:px-2 px-16 flex  flex-wrap items-center center gap-5 w-full">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-light_yellow w-full sm:max-w-[224px] h-[260px] rounded-lg flex-col center text-center "
            >
              <div className="rounded-md overflow-hidden  w-full">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="object-cover sm:max-w-[224px] w-full h-[250px]"
                />
              </div>
              <div className="text-center center w-full h-[80px] bg-light_yellow rounded-lg p-2">
                <h3 className="max-sm:text-[14px] text-[16px] font-medium">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
