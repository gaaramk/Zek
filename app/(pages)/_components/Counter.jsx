"use client";
import { cartContext } from "@/app/_context/CartContext";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Counter = ({ item }) => {
  // use states
  const [count, setCount] = useState(1);

  const { updateCartProducts } = useContext(cartContext);

  //   disable increment and decrement
  const disableDecrement = count === 1;
  //   disable increment
  const disableIncrement = count === item.product.quantity;

  //   function to increment count
  const handleIncrement = () => {
    // increment count
    setCount((prevCount) => prevCount + 1);

    // update cart
    updateCartProducts(item.product._id, count + 1);

    // toast
    toast.success("Product added to cart", {
      duration: 2000,
    });
  };

  //   function decrement count
  const handleDecrement = () => {
    // check if count is greater than 1
    if (count > 1) {
      // decrement count
      setCount((prevCount) => prevCount - 1);

      // update cart
      updateCartProducts(item.product._id, count - 1);

      // toast
      toast.success("Product removed from cart", {
        duration: 2000,
      });
    }
  };



  //   useEffect to set count
  useEffect(() => {
    setCount(item.count);
  }, []);

  return (
    <>
      <div className="flex gap-3 items-center p-5">
        <Button
          size={"icon"}
          disabled={disableDecrement}
          onClick={handleDecrement}
        >
          -
        </Button>
        <h2>{count}</h2>
        <Button
          size={"icon"}
          onClick={handleIncrement}
          disabled={disableIncrement}
        >
          +
        </Button>
      </div>
    </>
  );
};

export default Counter;
