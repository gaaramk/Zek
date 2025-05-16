"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGSAP } from "@gsap/react";
import Autoplay from "embla-carousel-autoplay";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

const slides = [
  "./images/cover1.jpg",
  "./images/cover3.jpg",
  "./images/cover2.jpg",
  "./images/cover4.jpg",
];

const HomeSlider = () => {
  useGSAP(() => {
    gsap.set("#home", {
      clipPath: "polygon(15% 0, 74% 0, 90% 90%, 0 100%)",
      borderRadius: "0 0 10% 10%",
    });

    gsap.from("#home", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#home",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="relative overflow-hidden" id="home">
      <Carousel
        orientation="horizontal"
        opts={{ loop: true, dragFree: true }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false, // يستمر حتى بعد السحب
            stopOnMouseEnter: true, // يتوقف عند تحويم الماوس
          }),
        ]}
      >
        <CarouselContent>
          {slides.map((src, idx) => (
            <CarouselItem key={idx}>
              <Image
                src={src}
                width={1600}
                height={900}
                alt={`Slide ${idx + 1}`}
                className="w-full h-[100vh] object-cover"
                loading="lazy"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Prev/Next Buttons */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md transition">
          ‹
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md transition">
          ›
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default HomeSlider;
