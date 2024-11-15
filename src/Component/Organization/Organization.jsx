import { useEffect } from "react";
import bg from "../../assets/machines/Organization.jpg";
import { CommonBanner } from "./CommonBanner";
import { TeamImage } from "./TeamImage";

export const Organization = () => {
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <section>
      <CommonBanner background={bg} title="Organization" />

      <section className="max-w-screen-2xl w-[95%] mx-auto my-16">
        <TeamImage />
      </section>
    </section>
  );
};
