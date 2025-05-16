"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import {
  FreeMode,
  Navigation,
  Thumbs,
  Pagination,
  EffectCoverflow,
} from "swiper/modules";

const SwiperGallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="space-y-4">
      {/* Main Carousel */}
      <Swiper
        loop
        spaceBetween={20}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        freeMode={false}
        modules={[FreeMode, Navigation, Thumbs, Pagination, EffectCoverflow]}
        className="relative rounded-xl overflow-hidden"
      >
        {images.map((src) => (
          <SwiperSlide
            key={src}
            className="flex items-center justify-center bg-gray-100"
          >
            <img
              src={src}
              alt=""
              className="w-full h-[50vh] object-cover rounded-xl"
              loading="lazy"
            />
          </SwiperSlide>
        ))}

        {/* Custom nav buttons */}
        <button className="swiper-button-prev-custom absolute top-1/2 left-2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-200 transition">
          ◀
        </button>
        <button className="swiper-button-next-custom absolute top-1/2 right-2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-200 transition">
          ▶
        </button>
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="cursor-pointer"
        breakpoints={{
          640: { slidesPerView: 4 },
          320: { slidesPerView: 3 },
        }}
      >
        {images.map((src, idx) => (
          <SwiperSlide
            key={src}
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <img
              src={src}
              alt=""
              className="w-full h-20 object-cover rounded-lg border-2 border-transparent group-hover:border-blue-500"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperGallery;
