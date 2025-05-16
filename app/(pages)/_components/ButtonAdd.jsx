"use client";

import { cartContext } from "@/app/_context/CartContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";

const ButtonAdd = ({ id }) => {
  const { addProduct } = useContext(cartContext);

  // get token
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");

  // use router
  const router = useRouter();

  // function to add product to cart
  const handleAddToCart = async (id) => {
    // check if user is logged in
    if (!token) {
      // redirect to sign in page
      router.push("/signin");
      return;
    }

    // add product
    const res = await addProduct(id);

    // check if product added
    if (res) {
      toast.success("Product added to cart", {
        duration: 2000,
      });
    } else {
      toast.error("Error", {
        duration: 2000,
      });
    }
  };

  return (
    <>
      <button
        className="cursor-pointer w-full my-3 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 p-9 rounded-md px-4 py-2 has-[>svg]:px-3"
        onClick={() => handleAddToCart(id)}
      >
        Add to cart
      </button>
    </>
  );
};

export default ButtonAdd;
