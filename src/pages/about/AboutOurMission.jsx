import React, { useEffect } from "react";
import { CommonBanner } from "../../Component/Organization/CommonBanner";
import bg from "../../assets/about/missionVision.jpg";

export const AboutOurMission = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="overflow-x-hidden">
      {/* Common Banner Section */}
      <CommonBanner background={bg} title="Our Mission & Vision" /> 

      {/* Main Content */}
      <div className="w-full mt-12 px-8 lg:px-32">
        {/* Mission Section */}
        <h2 className="text-center py-4 px-2 text-lg lg:text-2xl bg-[#fef116] w-[190px]  font-semibold mb-4">
          Our Mission...
        </h2>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              num: 1,
              text: "To proactively engage our customers to seek better ways to serve their business needs.",
              bgColor: "bg-[#15B392]",
              textColor: "text-white",
            },
            {
              num: 2,
              text: "To create an environment for employees to realize their full potential.",
              bgColor: "bg-[#FF8400]",
              textColor: "text-white",
            },
            {
              num: 3,
              text: "To build long term relationships with business partners, suppliers, and financiers.",
              bgColor: "bg-[#379237]",
              textColor: "text-white",
            },
          ].map((mission, index) => (
            <div
              key={index}
              className="flex items-center border py-6 px-8 rounded-lg"
            >
              <p
                className={`p-4 rounded-full h-10 w-10 flex items-center justify-center ${mission.bgColor} ${mission.textColor}`}
              >
                {mission.num}
              </p>
              <p className="text-sm lg:text-base text-[#2a4255] leading-relaxed ml-4">
                {mission.text}
              </p>
            </div>
          ))}
        </div>

        {/* Vision Section */}
        <h2 className="text-center p-4 px-2 mt-16 text-lg lg:text-2xl font-semibold bg-[#fef116] w-[190px] mb-4">
          Our Vision...
        </h2>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              title: "TO OUR CUSTOMERS",
              num: 1,
              text: "We deliver consistent services and excellent solutions.",
              bgColor: "bg-[#836FFF]",
              textColor: "text-white",
            },
            {
              title: "TO OUR EMPLOYEES",
              num: 2,
              text: "We are an environment where employees feel secure to release their aspirations.",
              bgColor: "bg-[#15133C]",
              textColor: "text-white",
            },
            {
              title: "TO OUR INVESTORS",
              num: 3,
              text: "We achieve attractive shareholder returns.",
              bgColor: "bg-[#16423C]",
              textColor: "text-white",
            },
          ].map((vision, index) => (
            <div
              key={index}
              className="flex flex-col items-center border py-6 px-8 rounded-lg"
            >
              <h2 className="text-center font-bold mb-2">{vision.title}</h2>
              <div className="flex justify-center">
                <p
                  className={`p-4 rounded-full h-10 w-10 flex items-center justify-center ${vision.bgColor} ${vision.textColor}`}
                >
                  {vision.num}
                </p>
                <p className="text-sm lg:text-base text-[#2a4255] leading-relaxed ml-4">
                  {vision.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Vision Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              title: "TO OUR FINANCIERS",
              num: 4,
              text: "We are a growing, well-managed, and diversified business entity.",
              bgColor: "bg-[#FFC700]",
              textColor: "text-white",
            },
            {
              title: "TO OUR SUPPLIERS",
              num: 5,
              text: "We honor our commitment and we are a vehicle for their long-term growth.",
              bgColor: "bg-[#9BEC00]",
              textColor: "text-white",
            },
          ].map((vision, index) => (
            <div
              key={index}
              className="flex flex-col items-center border py-6 px-8 rounded-lg"
            >
              <h2 className="text-center font-bold mb-2">{vision.title}</h2>
              <div className="flex justify-center">
                <p
                  className={`p-4 rounded-full h-10 w-10 flex items-center justify-center ${vision.bgColor} ${vision.textColor}`}
                >
                  {vision.num}
                </p>
                <p className="text-sm lg:text-base text-[#2a4255] leading-relaxed ml-4">
                  {vision.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              title: "TO OUR BUSINESS PARTNERS",
              num: 6,
              text: "We are trustworthy to our partners to achieve their business goals.",
              bgColor: "bg-[#CF4DCE]",
              textColor: "text-white",
            },
          ].map((vision, index) => (
            <div
              key={index}
              className="flex flex-col items-center border py-6 px-8 rounded-lg"
            >
              <div>
                <h2 className="text-center font-bold mb-2 w-[200px]">
                  {vision.title}
                </h2>
              </div>

              <div className="flex justify-center">
                <p
                  className={`p-4 rounded-full h-10 w-10 flex items-center justify-center ${vision.bgColor} ${vision.textColor}`}
                >
                  {vision.num}
                </p>
                <p className="text-sm lg:text-base text-[#2a4255] leading-relaxed ml-4">
                  {vision.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
