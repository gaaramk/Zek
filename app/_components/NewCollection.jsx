"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const NewCollection = () => {
  useGSAP(() => {
    const elements = [
      { id: "#title", y: 40 },
      { id: "#heading", y: 60 },
      { id: "#text", y: 40 },
      { id: "#collectionOne", x: -80 },
      { id: "#collectionTwo", x: 80 },
    ];

    elements.forEach(({ id, x = 0, y = 0 }) => {
      gsap.from(id, {
        opacity: 0,
        x,
        y,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: id,
          start: "top 80%",
          end: "bottom 60%",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <section className="w-full py-24 bg-white dark:bg-black overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <h2
          id="title"
          className="text-sm md:text-base font-mono uppercase tracking-wide text-gray-600 dark:text-gray-300"
        >
          Welcome to our new collection
        </h2>

        {/* Heading */}
        <h1
          id="heading"
          className="mt-6 mb-14 text-center text-4xl md:text-6xl font-bold uppercase leading-tight text-gray-900 dark:text-white"
        >
          Disc<b>o</b>ver the world’s <br />
          largest collection of sun<b>g</b>lasses
        </h1>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
          {/* Image 1 */}
          <div
            id="collectionOne"
            className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <img
              src="./images/colle.jpg"
              alt="New Collection 1"
              className="w-full h-full object-cover aspect-[3/4] hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white text-lg font-semibold px-4 py-2 rounded-md">
              New Collection
            </div>
          </div>

          {/* Image 2 */}
          <div
            id="collectionTwo"
            className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <img
              src="./images/colle2.jpg"
              alt="New Collection 2"
              className="w-full h-full object-cover aspect-[3/4] hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white text-lg font-semibold px-4 py-2 rounded-md">
              New Collection
            </div>
          </div>
        </div>

        {/* Description Text */}
        <div id="text" className="mt-12 text-center space-y-3">
          <p className="text-gray-600 dark:text-gray-400 uppercase text-sm tracking-wide">
            The game has begun — your life, your vision, your future.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            MRNOBODY unites the world’s largest collection of sunglasses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewCollection;
