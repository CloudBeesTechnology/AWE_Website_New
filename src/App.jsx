import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './Component/Navbar';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Home } from './pages/home/Home';
import { Footer } from './Component/Organization/Footer';
import { Organization } from './Component/Organization/Organization';
import { OurWorkForce } from './pages/about/OurWorkForce';
import { About } from './pages/about/About';
import { OurVision } from './pages/about/OurVision';
import { AboutOurMission } from './pages/about/AboutOurMission';
import { AboutService } from './pages/about/AboutService';
import { Contact } from './pages/contact/Contact';
import { Gallery } from './pages/gallery/Gallery';
import { AboutValues } from './pages/about/AboutValues';
import { CareerSection } from './pages/applyJob/CareerSection';
import { AddCandidates } from './pages/applyJob/apply/AddCandidates';
import { ApplicantDetails } from './pages/applyJob/apply/ApplicatDetails';
import { EducationDetails } from './pages/applyJob/apply/EducationaDetails';
import { OtherDetails } from './pages/applyJob/apply/OtherDetails';
import { PersonalDetails } from './pages/applyJob/apply/PersonalDetails';
import { useEffect } from 'react';
import { ImageGrid } from './pages/gallery/ImageGrid';
import Achievements from './Component/Organization/Achievements';
import { workersSlides, chairmanSlides, hariRayaSlides, hisMajesty77Slides, hlpSlides, hisMajesty78Slides } from "./pages/gallery/ImageContainer"; // Ensure the correct path



export const App = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const location = useLocation();
  const hideNavbar = ["/applyJob", "/addCandidates", "/addCandidates/personalDetails", "/addCandidates/educationDetails", "/addCandidates/otherDetails"];
  return (

    <HelmetProvider>
      <Helmet>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        {/* <Route path="/ourWorkForce" Component={OurWorkForce} /> */}
        <Route path="/about" Component={About} />
        <Route path="/ourVision" Component={OurVision} />
        <Route path="/values" Component={AboutValues} />
        <Route path="/ourMission" Component={AboutOurMission} />
        <Route path="/OurService" Component={AboutService} />
        <Route path="/contact" Component={Contact} />
        {/* <Route path="/gallery" Component={Gallery} />
        <Route path="/images" Component={ImageGrid} /> */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/images/lti" element={<ImageGrid images={workersSlides} title="25 MILLION HOURS WITHOUT LTI" color="#F93131" />} />
        <Route path="/images/chairman" element={<ImageGrid images={chairmanSlides} title="CHAIRMAN 90TH BIRTHDAY 2022" color="#53FB5E" />} />
        <Route path="/images/hari-raya" element={<ImageGrid images={hariRayaSlides} title="HARI RAYA CELEBRATION 2023" color="#4C79DA" />} />
        <Route path="/images/his-majesty-77" element={<ImageGrid images={hisMajesty77Slides} title="HIS MAJESTY 77TH BIRTHDAY 2023" color="#F148E5" />} />
        <Route path="/images/hlp" element={<ImageGrid images={hlpSlides} title="HLP 2024" color="#C9C900" />} />
        <Route path="/images/his-majesty-78" element={<ImageGrid images={hisMajesty78Slides} title="HIS MAJESTY 78TH BIRTHDAY 2024" color="#F36B21" />} />
        <Route path="/applyJob" Component={CareerSection} />
        <Route path="/addCandidates" Component={AddCandidates}>
          <Route index element={<ApplicantDetails />} />
          <Route path="personalDetails" element={<PersonalDetails />} />
          <Route path="educationDetails" element={<EducationDetails />} />
          <Route path="otherDetails" element={<OtherDetails />} />
        </Route>
        <Route path="/organization" Component={Organization} />
        <Route path="/certification" Component={Achievements} />

      </Routes>
      {!hideNavbar.includes(location.pathname) && <Footer />}
      {/* <Footer/> */}
    </HelmetProvider>
  );
}





