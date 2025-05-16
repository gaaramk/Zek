"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { SkewLoader } from "react-spinners";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { cartContext } from "@/app/_context/CartContext";

const PaymentForm = () => {
  // states
  const [loading, setLoading] = useState(false);
  const [iSOnline, setISOnline] = useState(false);

  // get cart id
  const { cartID, updatUi } = useContext(cartContext);

  // user object to store user data
  let user = {
    details: "",
    phone: "",
    city: "",
  };

  //   check if user pays online or cash on delivery
  const detectAndCall = (value) => {
    if (!iSOnline) {
      cashOnDelivery(value);
    } else {
      onlinePayment(value);
    }
  };

  // function cash on delivery
  const cashOnDelivery = (values) => {
    // set loading to true
    setLoading(true);

    // backend body
    const backendBody = {
      shippingAddress: values,
    };

    // send post request
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
        backendBody,
        {
          headers: {
            token:
              localStorage.getItem("token") || sessionStorage.getItem("token"),
          },
        }
      )
      .then((data) => {
        toast.success("Order placed successfully");

        // clear input fields
        formik.resetForm();

        // update UI
        updatUi();

        // set loading to false
        setLoading(false);
      })
      // catch error
      .catch((error) => {
        toast.error("Error: " + error.response.data.message);

        // set loading to false
        setLoading(false);
      });
  };

  // function online payment
  const onlinePayment = (values) => {
    // set loading to true
    setLoading(true);

    // backend body
    const backendBody = {
      shippingAddress: values,
    };

    // send post request
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`,
        backendBody,
        {
          headers: {
            token:
              localStorage.getItem("token") || sessionStorage.getItem("token"),
          },
          params: {
            url: "http://localhost:3000",
          },
        }
      )
      .then((data) => {
        toast.success("Order placed successfully");

        window.open(data.data.session.url, "_self");

        // set loading to false
        setLoading(false);
      })
      // catch error
      .catch((error) => {
        toast.error("Error: " + error.response.data.message);

        // set loading to false
        setLoading(false);
      });
  };

  // validation schema
  let validationSchema = yup.object().shape({
    details: yup
      .string()
      .min(2, "Details must be at least 2 characters")
      .max(25, "Details must be at most 25 characters")
      .required("Details is required"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(
        /^01[0125][0-9]{8}$/,
        'Phone number must be in the format "01XXXXXXXXX"'
      ),
    city: yup
      .string()
      .min(2, "City must be at least 2 characters")
      .max(25, "City must be at most 25 characters")
      .required("City is required"),
  });

  // use formik hook to handle form
  const formik = useFormik({
    // initial values of form
    initialValues: user,

    // function to handle form submit
    onSubmit: detectAndCall,

    // validation schema
    validationSchema: validationSchema,
  });

  return (
    <>
      <div className="md:w-[80%] mx-auto border rounded-2xl shadow-2xl m-5 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="hidden md:block">
            <Image
              src="/login.jpg"
              alt="logo"
              width={1000}
              height={1000}
              className="w-full rounded-xl"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-5">Payment</h1>

            <form className="space-y-6 p-3" onSubmit={formik.handleSubmit}>
              {/* details */}
              <div className="relative z-0">
                <input
                  type="text"
                  id="details"
                  className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="details"
                  className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  details
                </label>

                {formik.touched.details && formik.errors.details ? (
                  <div className="text-red-600 pt-3">
                    {formik.errors.details}
                  </div>
                ) : null}
              </div>

              {/* phone */}
              <div className="relative z-0">
                <input
                  type="tel"
                  id="phone"
                  className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="phone"
                  className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  phone
                </label>

                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-600 pt-3">{formik.errors.phone}</div>
                ) : null}
              </div>

              {/* city */}
              <div className="relative z-0">
                <input
                  type="text"
                  id="city"
                  className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="city"
                  className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  city
                </label>

                {formik.touched.city && formik.errors.city ? (
                  <div className="text-red-600 pt-3">{formik.errors.city}</div>
                ) : null}
              </div>

              <Button
                onClick={() => setISOnline(false)}
                className="w-full mt-3 cursor-pointer"
              >
                {loading ? <SkewLoader /> : "Pay on delivery"}
              </Button>

              <Button
                onClick={() => setISOnline(true)}
                className="w-full mt-3 cursor-pointer"
              >
                {loading ? <SkewLoader /> : "Online payment"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
