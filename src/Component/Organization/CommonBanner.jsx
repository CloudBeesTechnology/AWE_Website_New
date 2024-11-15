

export const CommonBanner = ({background,title}) => {
  return (
    <div
        className={`bg-cover bg-center bg-no-repeat py-6 relative -z-10`}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="h-full w-full absolute top-0 left-0 bg-[#0000004D] backdrop-blur-sm -z-10" ></div>
        <div className="max-w-screen-2xl w-[95%] mx-auto  my-16 z-20 pl-14 max-sm:pl-5 pr-2 space-y-8">

            <h1 className="text-[60px] font-extrabold text-white max-sm:text-[40px]  ">{title}</h1>
            {/* <p className="text-white text-lg font-medium border-l-[3px] border-white px-3 ">
            From the most remote corners of the Earth comes the fuel <br/> that makes modern life possible.
            </p> */}
        </div>
      </div>
  )
}
