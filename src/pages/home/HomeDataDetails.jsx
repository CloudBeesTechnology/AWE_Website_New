import React from 'react';
// import image1 from "../../assets/home/icon/Group1.png"

import image1 from "../../assets/home/AWE Services Consist of/Project Management and Manpower Logistics.jpg";
import image2 from "../../assets/home/AWE Services Consist of/Fabrication & Erection of Structural Steel.jpg";
import image3 from "../../assets/home/AWE Services Consist of/Fabrication & Erection of Piping.jpg";
import image4 from "../../assets/home/AWE Services Consist of/Post Weld Heat Treatment.png.jpg";
import image5 from "../../assets/home/AWE Services Consist of/Plant Maintenance.jpg";
import image6 from "../../assets/home/AWE Services Consist of/Machining.jpg";
import image7 from "../../assets/home/AWE Services Consist of/Blasting & Coating.jpg";
import image8 from "../../assets/home/AWE Services Consist of/Insulation Services.jpg";
import image9 from "../../assets/home/AWE Services Consist of/Electrical & Intrumentation.jpg";
import image10 from "../../assets/home/AWE Services Consist of/Rotating Equipment Overhauls.jpg";
import image11 from "../../assets/home/AWE Services Consist of/Flange Management Services.jpg";
import image12 from "../../assets/home/AWE Services Consist of/Scaffolding Services.jpg"

export const services = [
  {
    icon: image1, // Replace with your icon image URL
    title: 'Project Management & Manpower Logistics',
  },
  {
    icon: image2, // Replace with your icon image URL
    title: 'Fabrication & Erection of Structural Steel',
  },
  {
    icon: image3, // Replace with your icon image URL
    title: 'Fabrication & Erection of Piping',
  },
  {
    icon: image5, // Replace with your icon image URL
    title: 'Plant Maintenance  ',
  },
  {
    icon: image4, // Replace with your icon image URL
    title: 'Post Weld Heat Treatment Services',
  },
  {
    icon: image6, // Replace with your icon image URL
    title: 'Machining Service',
  },
  {
    icon: image7, // Replace with your icon image URL
    title: 'Blasting & Coating',
  },
  {
    icon: image8, // Replace with your icon image URL
    title: 'Insulation Services',
  },
  {
    icon: image9, // Replace with your icon image URL
    title: 'Electrical & Instrumentation',
  },
  {
    icon: image10, // Replace with your icon image URL
    title: 'Rotating Equipment Overhauls',
  },
  {
    icon: image11,
    title: "Flange Management Services",
  },
  {
    icon: image12,
    title: "Scaffolding Services",
  }
];

import slide1 from "../../assets/home/Home1.jpg"
import slide2 from "../../assets/home/Home2.jpg"
import slide3 from "../../assets/home/Home3.jpg"
import slide4 from "../../assets/home/Home4.jpg"


export const HSDetail = [
  {
    img: slide1,
    title: <p> FROM <span className='text-primary'>OUR</span> KITCHEN <br /> TO  YOUR TABLE</p>,
    desc: "Life is uncertain. Eat dessert first.",
  },
  {
    img: slide4,
    title: <p>FRIED <span className='text-primary'>MUTTON</span>  <br />TO YOUR TABLE</p>,
    desc: "Life is uncertain. Eat dessert first.",
  },
  {
    img: slide2,
    title: <p>DELICIOUS <span className='text-primary'>CHICKEN</span>  <br />BIRIYANI</p>,
    desc: "LIMITED TIME ONLY!",
  },
  {
    img: slide3,
    title: <p>FRIED <span className='text-primary'>MUTTON</span>  <br />TO YOUR TABLE</p>,
    desc: "Life is uncertain. Eat dessert first.",
  },

]
//need some chnages if i hover the links on right the image have to come in left and if click the image it have to route based on link category