import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TiTickOutline } from "react-icons/ti";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import slide1 from "../../assets/home/Events/SafetySpotlight.jpeg";
import slide2 from "../../assets/home/Events/SafetySpotlight2.jpg";
import slide3 from "../../assets/home/Events/25 Million Safe Man-Hours Without Lost Time Injury (LTI) Copy copy.jpeg";
import slide4 from "../../assets/home/Events/Celebrating Hari Raya 2024.jpg";
import slide5 from "../../assets/home/Events/Happy 78th Birthday to His Majesty Sultan of Brunei.JPG";

export const HomeNewEvent = () => {
  const events = [
    { name: "Safety Spotlight Bulletin #1", image: slide1, link: "/images/lti" },
    { name: "Safety Spotlight Bulletin #2", image: slide2 },
    { name: "25 Million Safe Man-Hours Without Lost Time Injury (LTI)", image: slide3 },
    { name: "Celebrating Hari Raya 2024", image: slide4 },
    { name: "Happy 78th Birthday to His Majesty Sultan of Brunei", image: slide5 },
  ];

  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const handleEventHover = (event, index) => {
    setSelectedEvent(event);
    setActiveIndex(index);
  };

  const handleLinkClick = (event, index) => {
    setSelectedEvent(event);
    setActiveIndex(index);
    if (event.link) {
      navigate(event.link, { state: { images: [event.image], title: event.name } });
    }
  };

  // Navigate to the previous event
  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? events.length - 1 : prevIndex - 1;
      setSelectedEvent(events[newIndex]);
      return newIndex;
    });
  };

  // Navigate to the next event
  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % events.length;
      setSelectedEvent(events[newIndex]);
      return newIndex;
    });
  };

  // useEffect(() => {
  //   const isSmallScreen = window.innerWidth < 640;

  //   if (isSmallScreen) {
  //     const interval = setInterval(() => {
  //       handleNext();
  //     }, 8000);

  //     return () => clearInterval(interval);
  //   }
  // }, []);

  return (
    <div className="screen-size  sm:mb-10 mb-14">
      <h2 className="text-black sm:my-10 mb-5 text-[20px] text-center sm:text-[34px] font-semibold relative">
        <span className="sm:absolute sm:w-[200px] sm:h-4 sm:top-11 sm:border-b-4 border-dark_red"></span>
        NEWS & EVENTS
      </h2>

      <div className="flex max-lg:flex-col flex-row items-center justify-evenly w-full h-full gap-2 lg:gap-10 my-2 lg:my-10">
        {/* Left Image Section */}
        <div className="relative flex justify-center w-full max-md:w-full sm:px-10 lg:w-[600px] h-[250px] sm:h-[600px] cursor-pointer">
          {/* Left Button */}
          <button
            className="absolute max-lg:left-2 -left-4 top-1/2 transform -translate-y-1/2 bg-[#8080807f] p-2 text-white rounded-full shadow-lg hover:bg-grey"
            onClick={handlePrev}
          >
            <FaChevronLeft size={14} />
          </button>

          <img src={selectedEvent.image} alt={selectedEvent.name} className="rounded-md w-full h-full object-cover" />

          {/* Right Button */}
          <button
            className="absolute max-lg:right-2 -right-4 top-1/2 transform -translate-y-1/2 bg-[#8080807f] text-white p-2 rounded-full shadow-lg hover:bg-grey"
            onClick={handleNext}
          >
            <FaChevronRight size={14} />
          </button>
        </div>

        {/* Right Event List Section */}
        <div className="gap-5 screen-size border bg-white shadow shadow-dark_red px-6 py-6 rounded-lg  w-full lg:w-[500px] h-[250px] lg:h-[600px] flex flex-col overflow-y-auto scrollBar">
          <ul className="space-y-6 max-sm:space-y-4">
            {events.map((event, index) => (
              <li
                key={index}
                className={`flex gap-2 cursor-pointer ${activeIndex === index ? "text-dark_red font-bold" : "text-[#50A5EB]"}`}
                onMouseEnter={() => handleEventHover(event, index)}
                onClick={() => handleLinkClick(event, index)}
              >
                <span className="text-xl">
                  <TiTickOutline />
                </span>
                <span className={`text-[16px] max-sm:text-[14px] transition ${activeIndex === index ? "hover:text-dark_red" : "hover:text-dark_red"}`}>
                  {event.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { TiTickOutline } from "react-icons/ti";

// import slide1 from "../../assets/home/Events/SafetySpotlight.jpeg";
// import slide2 from "../../assets/home/Events/SafetySpotlight2.jpg";
// import slide3 from "../../assets/home/Events/25 Million Safe Man-Hours Without Lost Time Injury (LTI) Copy copy.jpeg";
// import slide4 from "../../assets/home/Events/Celebrating Hari Raya 2024.jpg";
// import slide5 from "../../assets/home/Events/Happy 78th Birthday to His Majesty Sultan of Brunei.JPG";


// export const HomeNewEvent = () => {
//   const events = [
//     { name: 'Safety Spotlight Bulletin #1', image: slide1, link: '/images/lti' },
//     { name: 'Safety Spotlight Bulletin #2', image: slide2 },
//     { name: '25 Million Safe Man-Hours Without Lost Time Injury (LTI)', image:slide3 },
//     { name: 'Celebrating Hari Raya 2024', image:slide4 },
//     { name: 'Happy 78th Birthday to His Majesty Sultan of Brunei', image:slide5 },

//   ];

//   const [selectedEvent, setSelectedEvent] = useState(events[0]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [name, setName] = useState('')
//   const navigate = useNavigate();

//   const handleEventHover = (event, index) => {
//     setSelectedEvent(event);
//     setActiveIndex(index);
//   };

//   const handleLinkClick = (event, index) => {
//     setSelectedEvent(event); // Update the selected event
//     setActiveIndex(index); // Set the active index
//     if (event.link) {
//       navigate(event.link, { state: { images: [event.image], title: event.name } });
//     }
//   };

//   useEffect(() => {
//     const isSmallScreen = window.innerWidth < 640; // Change this threshold as needed

//     if (isSmallScreen) {
//       const interval = setInterval(() => {
//         setActiveIndex((prevIndex) => {
//           const nextIndex = (prevIndex + 1) % events.length;
//           setSelectedEvent(events[nextIndex]);
//           return nextIndex;
//         });
//       }, 3000); 

//       return () => clearInterval(interval); 
//     }
//   }, [events]);



//   return (
//     <div className="screen-size mx-auto sm:mb-10 mb-14">
//       <h2 className=" text-black sm:my-10 mb-5 text-[20px] text-center sm:text-[34px] font-semibold relative">
//         <span className='sm:absolute sm:w-[200px] sm:h-4 sm:top-11 sm:border-b-4 border-dark_red'></span>
//         NEWS & EVENTS
//       </h2>

//       <div className='flex flex-col sm:flex-row items-center justify-evenly w-full gap-2 lg:gap-10 my-2 lg:my-10'>
//         {/* Left Image Section */}
//         <div className="flex justify-center w-full sm:w-[380px] lg:w-[600px] h-[250px] sm:h-[600px] overflow-hidden cursor-pointer">
//           <img
//             src={selectedEvent.image}
//             alt={selectedEvent.name}
//             className="rounded-md w-full h-full object-fit"
//           />
//         </div>


//         {/* Right Event List Section */}
//         <div className="justify-evenly gap-5 items-center bg-white shadow shadow-dark_red px-6 py-6 rounded-lg border w-full sm:w-[380px] h-[490px] max-sm:h-[380px] flex flex-col">
//           <ul className="space-y-8 max-sm:space-y-6">
//             {events.map((event, index) => ( 
//               <li
//                 key={index}
//                 className={`flex gap-2 cursor-pointer ${activeIndex === index ? 'text-dark_red font-bold' : 'text-[#50A5EB]'}`}
//                 onMouseEnter={() => handleEventHover(event, index)}
//                 onClick={() => handleLinkClick(event, index)}
              
//               >
//                 <span className="text-xl"><TiTickOutline /></span>
//                 <span className={`text-[16px] max-sm:text-[14px] transition ${activeIndex === index ? 'hover:text-dark_red' : 'hover:text-dark_red'}`}>{event.name}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };
