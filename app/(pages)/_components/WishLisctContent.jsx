"use client";
import Product from "@/app/_components/Product";
import { wishContext } from "@/app/_context/WishContext";
import { useContext } from "react";
import { HeartOff } from "lucide-react";

const WishlistContent = () => {
  const { wishProducts } = useContext(wishContext);

  if (!wishProducts || wishProducts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 flex flex-col items-center">
        <HeartOff className="w-10 h-10 mb-2" />
        <p>Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-gray-300 p-4 rounded-2xl my-3">
      {wishProducts.map((item) => (
        <Product key={item._id} product={item} isWish />
      ))}
    </div>
  );
};

export default WishlistContent;
