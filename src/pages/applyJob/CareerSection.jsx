import React from "react";
import { CommonBanner } from "../../Component/Organization/CommonBanner";
import bg from "../../assets/applyJob/applyJob-1.jpeg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { CareerData } from "./CareerData";

export const CareerSection = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <section>
      <CommonBanner background={bg} title="Apply Job" />
      <div className="flex flex-col center p-4 sm:p-10 space-y-6 md:space-y-0 md:space-x-10 max-sm:my-2 my-10">
        {/* Career Section */}
        <div className=" max-sm:my-2 mb-10">
          <h2 className="text-3xl max-sm:text-[20px] font-bold">CAREER</h2>
          <p className="mt-4 text-[18px] max-sm:text-[14px] max-sm:text-justify">
            Fast movement, unlimited challenges and excitement to explore. This
            is a right track for you. Having been established since 1980, Adinin
            Works & Engineering Sdn. Bhd. is a leading EPC: Oil and Gas Sector
            in Brunei Darussalam. Now we are opening career opportunities in
            many challenging areas and eagerly await any qualified and energetic
            candidates who have strong intention to join and share experiences
            with us. We are offering competitive salary package with other
            welfare and fringe benefits, dramatic career path, overseas training
            and international professional working environment. Your submitted
            CVs/Applications would be kept confidential in our recruitment
            database.
          </p>
        </div>

        <div className="space-y-4 ">
          {/* Title and description section */}
          <div className="text-center mb-6">
            <h1 className="text-2xl  max-sm:text-[20px] font-bold mb-4">
              Available Job Listings
            </h1>
            <p className="text-[18px] max-sm:text-[14px] ">
              Explore the latest job opportunities and find your next career
              move!
            </p>
          </div>

          <p className="center italic text-lg text-dark_red font-semibold">
            "Stay tuned for exciting opportunities! We'll be sharing upcoming
            vacancies soon - don't miss out!"
          </p>
        </div>
      </div>
    </section>
  );
};

