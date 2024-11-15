import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo/logo-with-name.svg";
import { RiMenuAddFill } from "react-icons/ri";
import { Sidebar } from "./Sidebar";
import { FaChevronDown } from "react-icons/fa";

export const Navbar = () => {
  const recruitmentPaths = [
    "/applyJob",
    "/addCandidates",
    "/addCandidates/personalDetails",
    "/addCandidates/educationDetails",
    "/addCandidates/otherDetails",
  ];

  const aboutPaths = [
    "/ourWorkForce",
    "/about",
    "/values",
    "/ourVision",
    "/ourMission",
    "/OurService",
    "/certification"
  ];

  const [showServicesList, setServicesList] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const dropdownRef = useRef(null); // Define the ref for the dropdown
  const location = useLocation(); // Hook to get the current path

  // Toggle service list
  const toggleServiceList = () => {
    setServicesList(!showServicesList);
  };

  // Close service list
  const closeServiceList = () => {
    setServicesList(false);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeServiceList();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check if the current path is part of recruitmentPaths
  const isRecruitmentActive = () => {
    return recruitmentPaths.some(path => location.pathname.startsWith(path));
  };

  // Check if the current path is part of aboutPaths
  const isAboutActive = () => {
    return aboutPaths.some(path => location.pathname.startsWith(path));
  };

  return (
    <section className="bg-white sticky top-0 shadow-md z-50">
      <div className="screen-size text-secondary flex justify-between items-center max-sm:gap-5 py-7 px-3">
        <div>
          <img
            className="object-cover max-w-[250px] w-full h-full"
            src={logo}
            alt="CSS logo not found"
          />
        </div>
        <div className="flex justify-center items-center gap-10 max-[1260px]:hidden">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "border-b-4 border-dark_red font-bold" : "")}
          >
            Home
          </NavLink>

          <div className="relative" ref={dropdownRef}>
            <NavLink
              to="/about"
              className={isAboutActive() ? "border-b-4 border-dark_red font-bold" : ""}
            >
              About Us
            </NavLink>
            <button onClick={toggleServiceList} className="ml-2 focus:outline-none">
              <FaChevronDown className="inline text-dark_red" />
            </button>

            {showServicesList && (
              <div className="absolute top-8 -left-10 bg-white flex flex-col text-[18px] p-4 gap-1 w-[170px] shadow-md rounded-md font-medium">
                <NavLink to="/ourMission" className="border-b border-grey p-1 text-dark_red text-[14px]" onClick={closeServiceList}>MISSION & VISION</NavLink>
                {/* <NavLink to="/ourVision" className="border-b border-grey p-1 text-dark_red text-[14px]" onClick={closeServiceList}>VISION</NavLink> */}
                <NavLink to="/values" className="border-b border-grey p-1 text-dark_red text-[14px]" onClick={closeServiceList}>VALUES</NavLink>
                <NavLink to="/OurService" className="border-b border-grey p-1 text-dark_red text-[14px]" onClick={closeServiceList}>SERVICES</NavLink>
                {/* <NavLink to="/ourWorkForce" className="border-b border-grey p-1 text-dark_red text-[14px]" onClick={closeServiceList}>WORKFORCE</NavLink> */}
                <NavLink to="/certification" className="uppercase p-1 text-dark_red text-[14px]" onClick={closeServiceList}>Achievements & Certification</NavLink>
              </div>
            )}
          </div>

          <NavLink
            to="/gallery"
            className={() => {
              const isGalleryActive =
                location.pathname === "/gallery" ||
                location.pathname.startsWith("/images");
              return isGalleryActive ? "border-b-4 border-dark_red font-bold" : "";
            }}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/organization"
            className={({ isActive }) => (isActive ? "border-b-4 border-dark_red font-bold" : "")}
          >
            Organization
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "border-b-4 border-dark_red font-bold" : "")}
          >
            Contact Us
          </NavLink>

          {/* Apply Job link */}
          <NavLink
            to="/applyJob"
            className={isRecruitmentActive() ? "border-b-4 border-dark_red font-bold" : ""}
          >
            Apply Job
          </NavLink>

          <div className="center">
            <Link
              to="https://main.d3u6ge0j06uiob.amplifyapp.com/"
              className="btn font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Employee Login
            </Link>
          </div>
        </div>

        <div className="text-[24px] font-bold [@media(min-width:1230px)]:hidden block px-3" onClick={toggleSidebar}>
          <RiMenuAddFill />
        </div>
      </div>
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
    </section>
  );
};

