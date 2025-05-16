"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const wishContext = createContext();

const WishContextProvider = ({ children }) => {
  const [wishProducts, setWishProducts] = useState(null);
  const [numOfWish, setNumOfWish] = useState(0);

  //   get wish list
  const getWishList = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
          token:
            localStorage.getItem("token") || sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNumOfWish(res.data.count);
        setWishProducts(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   useEffect
  useEffect(() => {
    getWishList();
  }, []);

  // add product to wishlist
  const addToWishList = async (productId) => {
    // send post request to add product to wishlist
    return await axios
      .post(
        // url
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        // body
        {
          productId: productId,
        },
        // headers
        {
          headers: {
            // token
            token:
              localStorage.getItem("token") || sessionStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        getWishList();
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  // remove product from wishlist
  const removeProductFromWish = async (productId) => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token:
            localStorage.getItem("token") || sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        getWishList();
        return true;
      })
      .catch((err) => {
        return false;
      });
  };

  return (
    <wishContext.Provider
      value={{
        addToWishList,
        getWishList,
        removeProductFromWish,
        wishProducts,
        numOfWish,
      }}
    >
      {children}
    </wishContext.Provider>
  );
};

export default WishContextProvider;
