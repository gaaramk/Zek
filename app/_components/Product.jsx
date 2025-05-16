"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { cartContext } from "../_context/CartContext";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { wishContext } from "../_context/WishContext";
import { Skeleton } from "@/components/ui/skeleton";

const Product = ({ product }) => {
  const { addProduct } = useContext(cartContext);
  const { addToWishList, wishProducts, removeProductFromWish } =
    useContext(wishContext);
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");
  const router = useRouter();
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!product) return null;

  const handleAddToCart = async (id) => {
    if (!token) return router.push("/signin");
    const res = await addProduct(id);
    res
      ? toast.success("Product added to cart", { duration: 2000 })
      : toast.error("Error", { duration: 2000 });
  };

  const handleAddToWish = async (id) => {
    if (!token) return router.push("/signin");
    const res = await addToWishList(id);
    res === true
      ? toast.success("Product added to wishlist", { duration: 2000 })
      : toast.error("Error", { duration: 2000 });
  };

  const handleDeleteWish = async (id) => {
    const res = await removeProductFromWish(id);
    res === true
      ? toast.success("Product removed from wishlist", { duration: 2000 })
      : toast.error("Error", { duration: 2000 });
  };

  const isInWishList = wishProducts?.some((item) => item._id === product._id);
  const isNew =
    new Date() - new Date(product.createdAt) < 7 * 24 * 60 * 60 * 1000;
  const isOnSale =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price;

  return (
    <div className="relative w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-black/20 dark:border-gray-700 transform transition hover:-translate-y-2">
      {/* Badge */}
      {(isNew || isOnSale) && (
        <div className="z-50 absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          {isOnSale ? "Sale" : "New"}
        </div>
      )}

      <Link href={`/products/${product._id}`}>
        <div className="relative">
          {!imgLoaded && <Skeleton className="w-full h-64 rounded-t-lg" />}
          <Image
            src={product.imageCover}
            width={100}
            height={100}
            alt={product.title}
            className="p-4 h-64 w-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
            unoptimized
            onLoadingComplete={() => setImgLoaded(true)}
          />
        </div>
      </Link>

      <div className="absolute top-3 right-3 cursor-pointer z-10">
        {isInWishList ? (
          <Heart
            fill="currentColor"
            stroke="currentColor"
            className="text-red-500 hover:scale-110 transition"
            onClick={() => handleDeleteWish(product._id)}
          />
        ) : (
          <Heart
            fill="transparent"
            stroke="currentColor"
            className="text-gray-700 hover:fill-red-500 hover:stroke-red-500 hover:scale-110 transition"
            onClick={() => handleAddToWish(product._id)}
          />
        )}
      </div>

      <div className="px-5 pb-5">
        <Link href={`/products/${product._id}`}>
          <h5 className="line-clamp-1 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 hover:text-blue-600 transition">
            {product.title}
          </h5>
          <small className="text-gray-500 dark:text-gray-400">
            {product?.category?.name}
          </small>
        </Link>

        {/* Stars & Rating */}
        <div className="flex items-center mt-2.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(product?.ratingsAverage || 0)
                  ? "text-yellow-300"
                  : "text-gray-200 dark:text-gray-600"
              } transition-colors duration-200`}
              fill="currentColor"
              viewBox="0 0 22 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">
            {product?.ratingsAverage?.toFixed(1) || "0.0"}
          </span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900 dark:text-white flex gap-2">
            {product?.priceAfterDiscount ? (
              <>
                <span>${product.priceAfterDiscount}</span>
                <span className="line-through text-red-500">
                  ${product.price}
                </span>
              </>
            ) : (
              <span>${product.price}</span>
            )}
          </div>
          <Button
            onClick={() => handleAddToCart(product._id)}
            className="transition-transform hover:scale-105"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
