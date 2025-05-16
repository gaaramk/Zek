import React from "react";
import Api from "../_utils/Api";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const PopulerProd = async () => {
  const products = await Api.getProducts();
  const populer = products.filter((item) => item.sold > 7000);

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Title & Link */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
            🔥 Popular Products
          </h2>
          <Link
            href="/products"
            className="text-blue-600 hover:underline text-sm md:text-base font-medium"
          >
            See more →
          </Link>
        </div>

        {/* Product Carousel */}
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {populer.map((item) => (
              <CarouselItem
                key={item._id}
                className="px-2 md:basis-1/2 lg:basis-1/4"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <img
                    src={item.imageCover}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        ${item.price}
                      </span>
                      {item.sold > 10000 && (
                        <span className="text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded">
                          Best Seller
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default PopulerProd;
