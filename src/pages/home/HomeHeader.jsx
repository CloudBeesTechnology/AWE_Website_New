import { HSDetail } from "../home/HomeDataDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import 'swiper/css/pagination';

export const HomeHeader = () => {

  return (
    <main>
      <section className="max-sm:pt-2 max-sm:pb-2 sm:center relative ">
        <div className="max-w-screen-2xl w-[100%] mx-auto">
          <section className="max-sm:pt-2  max-sm:pb-2 sm:center relative ">
            <div className="max-w-screen-2xl w-[100%] mx-auto">
              <Swiper
                className="w-full"
                modules={[Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                speed={1200}
              >
                <div className="center overflow-hidden">
                  {HSDetail.map((val, index) => (
                    <SwiperSlide key={index}>
                      <div className=" ">
                        <div className="space-y-10 absolute bottom-3 left-2 sm:bottom-16 sm:left-7">
                          <h1 id="headCrimson" className="font-crimson text-white bg-black bg-opacity-50  max-sm:center max-md:text-center max-sm:text-[20px] text-[50px] font-semibold max-sm:font-medium ">
                            <i>"The Professional Contractor  Of Choice"</i>
                          </h1>
                        </div>
                        <div className="w-full h-[300px] sm:h-[618px] overflow-hidden">
                          <img
                            className="object-cover w-full h-full "
                            src={val.img}
                            alt={`${index} not found`}
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

//i want this swiper more responsive, in samll screens the image height is not same for every image make sure everything same height