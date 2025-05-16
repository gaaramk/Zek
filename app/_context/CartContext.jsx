"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [numOfCartItem, setNumOfCartItem] = useState(0);
  const [cartID, setCartID] = useState(null);
  const [cartOwner, setCartOwner] = useState(null);
  const [ordersProduct, setOrdersProduct] = useState(null);

  // get token from local storage or session storage
  let headers = {
    token: localStorage.getItem("token") || sessionStorage.getItem("token"),
  };

  // add product to cart
  const addProduct = async (productId) => {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: {
            token:
              localStorage.getItem("token") || sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        getCartProducts();
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  // get cart products
  const getCartProducts = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {
        // console.log(res.data.data.cartOwner);

        setCartProducts(res.data.data.products);
        setNumOfCartItem(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCartID(res.data.data._id);
        setCartOwner(res.data.data.cartOwner);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  // update cart products
  const updateCartProducts = (productId, newCount) => {
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },
        {
          headers,
        }
      )
      .then((res) => {
        setCartProducts(res.data.data.products);
        setNumOfCartItem(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCartOwner(res.data.data.cartOwner);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // remove product from cart
  const removeProductFromCart = async (productId) => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => {
        setCartProducts(res.data.data.products);
        setNumOfCartItem(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCartOwner(res.data.data.cartOwner);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  // clear cart
  const clearCart = () => {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then(() => {
        setCartProducts(null);
        setNumOfCartItem(0);
        setTotalCartPrice(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // update UI
  const updateUI = () => {
    setCartProducts(null);
    setNumOfCartItem(0);
    setTotalCartPrice(0);
  };

  const getAllOrders = (user) => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${user}`, {
        headers: {
          token:
            localStorage.getItem("token") || sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setOrdersProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllOrders(cartOwner);
  }, [cartOwner]);

  return (
    <cartContext.Provider
      value={{
        cartProducts,
        numOfCartItem,
        totalCartPrice,
        cartID,
        ordersProduct,
        addProduct,
        getCartProducts,
        updateCartProducts,
        removeProductFromCart,
        clearCart,
        updateUI,
        getAllOrders,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
