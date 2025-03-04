import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiTickOutline } from "react-icons/ti";

import slide1 from "../../assets/home/Events/25 Million Safe Man-Hours Without Lost Time Injury (LTI) Copy.jpeg";
import slide2 from "../../assets/home/Events/Celebrating Hari Raya 2024.jpg";
import slide3 from "../../assets/home/Events/Happy 78th Birthday to His Majesty Sultan of Brunei.JPG";
import slide4 from "../../assets/home/Events/Happy Chinese New Year 2024.jpg";
import slide5 from "../../assets/home/Events/Head Office HLP 2024.JPG";
import slide6 from "../../assets/home/Events/The 40th National Day Celebration of Negara Brunei Darussalam.png";

export const HomeNewEvent = () => {
  const events = [
    { name: '25 Million Safe Man-Hours Without Lost Time Injury (LTI)', image: slide1, link: '/images/lti' },
    { name: 'Celebrating Hari Raya 2024', image: slide2, link: '/images/hari-raya' },
    { name: 'Happy 78th Birthday to His Majesty Sultan of Brunei', image: slide3, link: '/images/his-majesty-78' },
    { name: 'Happy Chinese New Year 2024', image: slide4 },
    { name: 'Head Office HLP 2024', image: slide5, link: '/images/hlp' },
    { name: 'The 40th National Day Celebration of Negara Brunei Darussalam', image: slide6 },
  ];

  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState('')
  const navigate = useNavigate();

  const handleEventHover = (event, index) => {
    setSelectedEvent(event);
    setActiveIndex(index);
  };

  // const handleImageClick = () => {
  //   navigate(selectedEvent.link, { state: { images: [selectedEvent.image], title: selectedEvent.name } });
  // };

  
  // const handleLinkClick = () => {
  //   if (selectedEvent.link) {
  //     navigate(selectedEvent.link, { state: { images: [selectedEvent.image], title: selectedEvent.name } });
  //   }
  // };

  const handleLinkClick = (event, index) => {
    setSelectedEvent(event); // Update the selected event
    setActiveIndex(index); // Set the active index
    if (event.link) {
      navigate(event.link, { state: { images: [event.image], title: event.name } });
    }
  };

  useEffect(() => {
    const isSmallScreen = window.innerWidth < 640; // Change this threshold as needed

    if (isSmallScreen) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % events.length;
          setSelectedEvent(events[nextIndex]);
          return nextIndex;
        });
      }, 3000); 

      return () => clearInterval(interval); 
    }
  }, [events]);



  return (
    <div className="screen-size mx-auto sm:mb-10 mb-14">
      <h2 className=" text-black sm:my-10 mb-5 text-[20px] text-center sm:text-[34px] font-semibold relative">
        <span className='sm:absolute sm:w-[200px] sm:h-4 sm:top-11 sm:border-b-4 border-dark_red'></span>
        NEWS & EVENTS
      </h2>

      <div className='flex flex-col sm:flex-row items-center justify-evenly w-full gap-2 lg:gap-10 my-2 lg:my-10'>
        {/* Left Image Section */}
        <div className="flex justify-center w-full sm:w-[380px] lg:w-[600px] h-[250px] sm:h-[600px] overflow-hidden cursor-pointer">
          <img
            src={selectedEvent.image}
            alt={selectedEvent.name}
            className="rounded-md w-full h-full object-fit"
          />
        </div>


        {/* Right Event List Section */}
        <div className="justify-evenly gap-5 items-center bg-white shadow shadow-dark_red px-6 py-6 rounded-lg border w-full sm:w-[380px] h-[490px] max-sm:h-[380px] flex flex-col">
          <ul className="space-y-8 max-sm:space-y-6">
            {events.map((event, index) => ( 
              <li
                key={index}
                className={`flex gap-2 cursor-pointer ${activeIndex === index ? 'text-dark_red font-bold' : 'text-[#50A5EB]'}`}
                onMouseEnter={() => handleEventHover(event, index)}
                onClick={() => handleLinkClick(event, index)}
              
              >
                <span className="text-xl"><TiTickOutline /></span>
                <span className={`text-[16px] max-sm:text-[14px] transition ${activeIndex === index ? 'hover:text-dark_red' : 'hover:text-dark_red'}`}>{event.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
// add that functionality for small scrrens automatic hovering links and image changingimage have to come automatically
