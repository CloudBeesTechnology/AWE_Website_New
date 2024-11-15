
import { useEffect } from "react";
import bg from "../../assets/about/aboutUS.jpg";
import { CommonBanner } from "../../Component/Organization/CommonBanner";
import { TeamImage } from "../../Component/Organization/TeamImage";

export const OurWorkForce = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <section>
      <CommonBanner background={bg} title="Our Workforce" />

      <section className="max-w-screen-2xl w-[95%] mx-auto my-16">
        <TeamImage />
      </section>
    </section>
  );
};
