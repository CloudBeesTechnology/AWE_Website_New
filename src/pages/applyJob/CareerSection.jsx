import React, { useContext, useEffect, useState } from "react";
import { CommonBanner } from "../../Component/Organization/CommonBanner";
import bg from "../../assets/applyJob/applyJob-1.jpeg";
import { DataSupply } from "../../utils/DataContext";
import { Link } from "react-router-dom";
import { getUrl } from "@aws-amplify/storage";

export const CareerSection = () => {
  const { hiringData } = useContext(DataSupply);
  const [jobUrls, setJobUrls] = useState({});

  const latestData = hiringData.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const validHiringData = latestData.filter((job) => {
    if (!job.expiryDate) {
      return;
    }

    const normalizedDate = job?.expiryDate?.replace(/[-/]/g, "-");
    const [day, month, year] = normalizedDate.split("-");
    const expiry = new Date(year, month - 1, day);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return expiry >= today;
  });

  return (
    <section>
      <CommonBanner background={bg} title="Apply Job" />
      <div className="flex flex-col center p-4 sm:p-10 space-y-6 md:space-y-0 md:space-x-10 max-sm:my-2 my-10">
        <div className="max-sm:my-2 mb-10">
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

        <div className="space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl max-sm:text-[20px] font-bold mb-4">
              Available Job Listings
            </h1>
            <p className="text-[18px] max-sm:text-[14px]">
              Explore the latest job opportunities and find your next career
              move!
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 sm:p-8">
            {validHiringData.length > 0 ? (
              validHiringData.map((val, index) => {
                // if (!val?.uploadJobDetails) {
                //   console.error("Missing uploadJobDetails for:", val);
                //   return null;
                // }

                // const fileKey = val.uploadJobDetails;
                // const jobUrl = jobUrls[val.id];

                return (
                  <div
                    key={index}
                    className="gap-7 space-y-4 p-2 rounded-md shadow-md max-w-lg w-full sm:w-[450px] border border-[red]"
                  >
                    <div className="flex justify-evenly items-center">
                      <p className="font-bold text-lg mt-2">{val?.jobTitle}</p>
                    </div>
                    <h4 className="font-semibold">
                      Description:{" "}
                      <span className="font-normal text-sm">
                        {val?.jobContent}
                      </span>
                    </h4>

                    <div className="">
                      <p className="py-1 px-2 text-sm">
                        <span className="text-sm">Experience:</span>{" "}
                        {val?.exper}
                      </p>
                      <p className="py-1 px-2 text-sm">
                        Location: {val?.location}
                      </p>
                      <p className="py-1 px-2 text-sm">
                        Posted On: {val?.startDate}
                      </p>
                      <p className="py-1 px-2 text-sm">
                        Apply Until: {val?.expiryDate}
                      </p>
                    </div>
                    <section className="flex items-center justify-evenly">
                      {val?.uploadJobDetails && (
                        <div>
                          <a
                            href={val.uploadJobDetails}
                            className={
                              "border-[#FEF116] border text-black center font-semibold py-2 px-4 rounded"
                            }
                          >
                            {val.uploadJobDetails ? "Download" : "N/A"}
                          </a>
                        </div>
                      )}

                      <div className="center py-2">
                        <Link
                          to="/addCandidates"
                          state={{ position: val?.jobTitle }}
                          className="bg-[#FEF116] text-black center font-semibold py-2 px-4 rounded"
                        >
                          APPLY JOB
                        </Link>
                      </div>
                    </section>
                  </div>
                );
              })
            ) : (
              <p className="center italic text-lg text-dark_red font-semibold">
                "Stay tuned for exciting opportunities! We'll be sharing
                upcoming vacancies soon - don't miss out!"
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
