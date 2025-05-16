"use client";

import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const SpecialProd = () => {
  useGSAP(() => {
    gsap.from("#special-text", {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#special-text",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from("#special-img", {
      opacity: 0,
      x: 80,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#special-img",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div
            id="special-img"
            className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500"
          >
            <Image
              src="/images/special.jpg"
              width={1000}
              height={600}
              alt="Special Product"
              className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right - Text */}
          <div id="special-text" className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              🌟 Special Product
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Experience our handpicked special product of the season. Designed
              with passion and crafted to perfection — because you deserve the
              best.
            </p>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              From unique design to unbeatable comfort, this product will
              redefine your style and elevate your look.
            </p>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Discover more and be part of the trendsetters who appreciate
              premium quality and timeless aesthetics.
            </p>

            {/* CTA Button */}
            <Button className="mt-4 w-fit text-base px-6 py-3">
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialProd;
