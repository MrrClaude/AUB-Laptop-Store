import React, { useState, useEffect } from "react";

const images = [
  "https://storage-asset.msi.com/global/picture/news/2022/nb/nb-20221219-5.jpg",
  "https://www.gloo.com.my/image/cache/catalog/04BrandsLandingpage/msi/MSI-Katana-GF66-1090x450.jpg",
  "https://www.ecogujju.com/wp-content/uploads/2022/04/gs75-20190107-1.jpg",
  "https://www.notebookcheck.net/fileadmin/_processed_/6/e/csm_9th_all_af148a5313.jpg",
  "https://www.mobileadvance.com/product_images/uploaded_images/09-raider2.jpg",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 3000);
    return () => clearInterval(interval);
  }, [length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % length);
  };

  return (
    <div className="relative ml-4 mr-4  overflow-hidden rounded-2xl shadow-lg ">
      {/* Image Slides */}
      <div className="relative h-56 sm:h-72  md:h-96 lg:h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/40 hover:bg-white/70 rounded-full p-2 transition"
      >
        <svg
          className="w-6 h-6 text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/40 hover:bg-white/70 rounded-full p-2 transition"
      >
        <svg
          className="w-6 h-6 text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-gray-400/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
