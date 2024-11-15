import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { CommonBanner } from "../../../Component/Organization/CommonBanner";
import bg from "../../../assets/applyJob/applyJob-1.jpeg";

export const AddCandidates = () => {
  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
      },[])
  const [activeTab, setActiveTab] = useState("applicantDetails");
  const navigate = useNavigate();
  const location = useLocation();
  

  const handleNext = () => {
    switch (activeTab) {
      case "applicantDetails":
        navigate("/addCandidates/personalDetails");
        setActiveTab("personalDetails");
        break;
      case "personalDetails":
        navigate("/addCandidates/educationDetails");
        setActiveTab("educationExperience");
        break;
      case "educationExperience":
        navigate("/addCandidates/otherDetails");
        setActiveTab("otherDetails");
        break;
      default:
        break;
    }
  };

  const handleTabClick = (tab, route) => {
    setActiveTab(tab);
    navigate(route);
  };

  // Update activeTab based on current route
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes("/personalDetails")) {
      setActiveTab("personalDetails");
    } else if (path.includes("/educationDetails")) {
      setActiveTab("educationExperience");
    } else if (path.includes("/otherDetails")) {
      setActiveTab("otherDetails");
    } else {
      setActiveTab("applicantDetails");
    }
  }, [location]);

  return (
    <section>
            <CommonBanner background={bg}  title="Apply Form"/>
    <section className="  w-full bg-[#F5F6F1] ">
      {/* min-h-screen overflow-y-auto */}
      <div className="screen-sizew-11/12 relative mx-auto p-8 ">
        <h2 className="text-[20px] font-bold mb-4 text-center mt-10 max-sm:mt-2 ">Application Form</h2>

        {/* Tab Navigation */}
        <div className="flex justify-between border-b mb-4 text-[14px] font-semibold overflow-x-auto  whitespace-nowrap scroll-smooth scrollbar-hide">
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeTab === "applicantDetails" ? "border-b-8 border-yellow" : ""
            }`}
            onClick={() => handleTabClick("applicantDetails", "/addCandidates")}
          >
            Applicant Details
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeTab === "personalDetails" ? "border-b-8 border-yellow" : ""
            }`}
            onClick={() => handleTabClick("personalDetails", "/addCandidates/personalDetails")}
          >
            Personal Details
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeTab === "educationExperience" ? "border-b-8 border-yellow" : ""
            }`}
            onClick={() => handleTabClick("educationExperience", "/addCandidates/educationDetails")}
          >
          Reference Details
          </button>
          <button
            className={`py-2 px-4 focus:outline-none ${
              activeTab === "otherDetails" ? "border-b-8 border-yellow" : ""
            }`}
            onClick={() => handleTabClick("otherDetails", "/addCandidates/otherDetails")}
          >
            Other Details
          </button>
        </div>

        {/* Render Child Components */}
        <div>
          <Outlet context={{ activeTab, handleNext }} />
        </div>
      </div>
    </section>
    </section>
  );
};