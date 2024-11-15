
import React, { useEffect, useState } from "react";
import bg from "../../assets/image capture/gallery.png";
import { CommonBanner } from "../../Component/Organization/CommonBanner";
import { HariRayaCelebrati } from "./HariRayaCelebrati";
import { HisMajesty77 } from "./HisMajesty77";
import { HisMajesty78 } from "./HisMajesty78";
import { HLP } from "./HLP";
import { LtiMillion } from "./LtiMillion";
import { Chairman } from "./Chairman";
import { useNavigate } from 'react-router-dom';
import { workersSlides, chairmanSlides, hariRayaSlides, hisMajesty77Slides, hlpSlides, hisMajesty78Slides } from "./ImageContainer";

export const Gallery = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const navigateToImageGrid = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const loadImages = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
      setLoading(false);
    };
    loadImages();
    
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="">
      <CommonBanner background={bg} title="Gallery" />
      <div className="px-2 lg:px-24 md:px-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:my-0 my-16">
        {loading ? (
          // Render skeletons while loading
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="p-2">
              <div className="skeleton h-64"></div>
            </div>
          ))
        ) : (
          <>
            <div className="p-2">
              <LtiMillion
                images={workersSlides}
                onClick={() => navigateToImageGrid("/images/lti")}
                className="h-64"
                loading={loading} 
              />
            </div>
            <div className="p-2">
              <HisMajesty78
                images={hisMajesty78Slides}
                onClick={() => navigateToImageGrid("/images/his-majesty-78")}
                className="h-64"
                loading={loading} 
              />
            </div>
            <div className="p-2">
              <HLP
                images={hlpSlides}
                onClick={() => navigateToImageGrid("/images/hlp")}
                className="h-64"
                loading={loading} 
              />
            </div>
            <div className="p-2">
              <HisMajesty77
                images={hisMajesty77Slides}
                onClick={() => navigateToImageGrid("/images/his-majesty-77")}
                className="h-64"
                loading={loading} 
              />
            </div>
            <div className="p-2">
              <HariRayaCelebrati
                images={hariRayaSlides}
                onClick={() => navigateToImageGrid("/images/hari-raya")}
                className="h-64"
                loading={loading} 
              />
            </div>
            <div className="p-2">
              <Chairman
                images={chairmanSlides}
                onClick={() => navigateToImageGrid("/images/chairman")}
                className="h-64"
                loading={loading} 
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};
