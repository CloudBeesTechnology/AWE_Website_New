import { useEffect } from "react";
import { CommonBanner } from "./CommonBanner";
import bg from "../../assets/machines/Organization.jpg";
import certificate1 from "../../assets/achievements/certificate1.png";
import certificate2 from "../../assets/achievements/certificate2.jpg";
import certificate3 from "../../assets/achievements/certificate3.jpg";
import certificate13 from "../../assets/achievements/certificate13.jpg";
import certificate4 from "../../assets/achievements/certificate4.jpeg";
import certificate5 from "../../assets/achievements/certificate5.jpeg";
import certificate6 from "../../assets/achievements/certificate6.jpeg";
import certificate7 from "../../assets/achievements/certificate7.jpeg";
import certificate8 from "../../assets/achievements/certificate8.jpeg";
import certificate9 from "../../assets/achievements/certificate9.jpeg";
import certificate10 from "../../assets/achievements/certificate10.jpg";
import certificate11 from "../../assets/achievements/certificate11.jpeg";
import certificate12 from "../../assets/achievements/certificate12.jpeg";
import certificate17 from "../../assets/achievements/certificate17.jpg";
import certificate14 from "../../assets/achievements/certificate14.jpg";
import certificate15 from "../../assets/achievements/certificate15.jpg";
import certificate16 from "../../assets/achievements/certificate16.jpg";
import certificate19 from "../../assets/achievements/certificate19.jpg";
import certificate20 from "../../assets/achievements/certificate20.jpg";
import certificate18 from "../../assets/achievements/certificate18.jpg";
import certificate21 from "../../assets/achievements/certificate21.jpg"
import certificate22 from "../../assets/achievements/certificate22.jpg"
import certificate23 from "../../assets/achievements/certificate23.jpg"
import certificate24 from "../../assets/achievements/certificate24.jpg"
import certificate25 from "../../assets/achievements/certificate25.jpg"

const certificates = [

  certificate2,
  certificate3,
  certificate13,
  certificate11,
  certificate23,
  certificate24,
  certificate17,
  certificate22,
  certificate25,
  certificate8,
  certificate7,
  certificate15,
  certificate10,
  certificate14,
  certificate16,
  certificate5,
  certificate20,
  certificate19,
  certificate18,
  certificate12,
  certificate6,
  certificate9,
  certificate4,
  certificate21,
];

const certificateDescriptions = [
  "1. Achievement of 5 Years Free of Lost Time Injury (LTI) 1997",
  "2. Business Partner Council 2011",
  "3. BLNG Safety Quarter 1 2011",
  "4. MKJB Career Exhibition (2013)",
  "5. Mini Plant Project, IBTE Jefri Bolkiah Campus 2017",
  "6. Appreciation for Outstanding Partnership 2017",
  "7. TA Appreciation 2017",
  "8. Brunei Energy Industry Integrity Pact 2018",
  "9. IBTE School of Energy and Engineering Satellite Market Day 2018", 
  "10. IAPS April Maintenance Campaign 2018",
  "11. IBTE Central Market Day 2019", 
  "12. IBTE Sultan Bolkiah Campus Market Day 2019", 
  "13. Department Of Energy 2021",
  "14. Recruitment Fair 2022",
  "15. Pesta Kerjaya 2022",  
  "16. Pesta Convo IBTE 2023",
  "17. UBD Appreciation Award 2024",
  "18. Most Active Contractor ",
  "19. Safety Award",
  "20. Contractor With Highest PAKAT Submission", 
  "21. Construction & Commissioning of Five New Cooling Tower Cells" ,
  ];

  // "MKJB Career Exhibition (2013)", 
  const isoCertification = [
    "ISO 14001:2015",
    "ISO 9001:2015",
    "ISO 45001:2018",
  ]

const Achievements = () => {

    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);

  return (
    <section>
      {/* Banner Section */}
      <CommonBanner background={bg} title="Achievements & Certification" />

      {/* First Row for the First 4 Images */}
      <div className="container mx-auto py-8 px-4 max-sm:px-0  lg:px-56">
        {/* <h2 className="text-center text-3xl font-bold mb-8">Our Achievements</h2> */}

        {/* First row: 4 certificates */}
        <div className="max-sm:center">
        <h2 className="mb-6 px-4 max-w-[200px] center rounded max-sm:center text-xl max-sm:text-[14px] bg-[#fef116] font-bold py-2 lg:py-4">ISO Certificates</h2>
        </div>
       
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-12 mb-8">
          {certificates.slice(0, 3).map((certificate, index) => (
            <div
              key={index}
              className="flex items-center flex-col bg-white shadow-lg mb-6 p-4 rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={certificate}
                alt={`Certificate ${index + 1}`}
                className=" h-[223px] sm:h-[250px] md:h-[300px] object-fit"
              />
                <div className="text-center text-[18px] max-sm:text-[14px] mt-4">
                <p>{isoCertification[index]}</p>
              </div>
            </div>
          ))} 
        </div>

        {/* Remaining rows: Polaroid style for images after the 4th */}
        <div className="max-sm:center">
        <h2 className="mb-6 px-4 max-w-[200px] center rounded max-sm:center text-xl max-sm:text-[14px] bg-[#fef116] font-bold py-2 lg:py-4">Awards</h2>
        </div>
       
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {certificates.slice(3).map((certificate, index) => (
            <div
              key={index}
              className="flex items-center flex-col bg-white shadow-lg mb-6 p-4 rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={certificate}
                alt={`Certificate ${index + 5}`}
                className="h-[223px] sm:h-[250px] md:h-[300px] object-fit"
              />
              <div className="text-center text-[18px] max-sm:text-[14px] mt-4">
                <p>{certificateDescriptions[index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
