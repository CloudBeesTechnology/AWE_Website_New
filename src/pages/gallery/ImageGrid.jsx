import React, { useState, useEffect } from "react";
import { Link ,useLocation} from "react-router-dom";
import { FaChevronRight, FaChevronLeft, FaArrowLeft } from "react-icons/fa";

export const ImageGrid = ({ images, title, color }) => {
    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);


  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openModal = (index) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const getImageSize = (image) => {
    const img = new Image();
    img.src = image;
    return new Promise((resolve) => {
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
    });
  };

  const [imageSizes, setImageSizes] = useState(Array(images.length).fill(null));

  React.useEffect(() => {
    Promise.all(images.map(getImageSize)).then(setImageSizes);
  }, [images]);

  if (images.length === 0) {
    return <p>No images to display.</p>;
  }

  

  return (
    <section>
      <header>
      <div className="w-full flex items-center justify-start gap-5 my-5 mx-12">
        <Link to="/gallery" className="text-xl text-grey">
          <FaArrowLeft />
        </Link>
        <h1
          className="px-12 flex-1 uppercase text-2xl font-semibold"
          style={{ color }}
        >
          {title}
        </h1>
        </div>
        
      </header>
      <div className="px-12 max-sm:px-2 p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            onClick={() => openModal(index)}
          >
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="rounded-md object-cover w-full h-56 transition-opacity duration-300 ease-in-out hover:opacity-90"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-[#848282] bg-opacity-95 flex items-center justify-center z-50">
          <div className="relative sm:relative md:static lg:static max-w-auto mx-auto">
            <button
              className="absolute top-4 right-4 text-white text-[40px] md:text-[50px]"
              onClick={closeModal}
            >
              &times;
            </button>
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-[40px] md:text-[50px]"
              onClick={prevImage}
            >
              <FaChevronLeft />
            </button>

            <div className="flex justify-center">
              {images.map((img, index) => {
                const isWider =
                  imageSizes[index]?.width > imageSizes[index]?.height;
                return (
                  <img
                    key={index}
                    src={img}
                    alt={`Image ${index + 1}`}
                    className={`max-h-[570px] ${
                      isWider
                        ? "w-auto lg:w-[900px] md:w-[500px] sm:w-[600px]"
                        : "w-auto"
                    } rounded mx-2 ${
                      index === selectedImageIndex ? "block" : "hidden"
                    }`}
                  />
                );
              })}
            </div>

            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-[40px] md:text-[50px]"
              onClick={nextImage}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
