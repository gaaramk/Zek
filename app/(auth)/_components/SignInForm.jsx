"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { SkewLoader } from "react-spinners";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { authContext } from "@/app/_context/AuthContext";
import { cartContext } from "@/app/_context/CartContext";
import { wishContext } from "@/app/_context/WishContext";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // get token from context
  const { setToken } = useContext(authContext);

  // get cart products
  const { getCartProducts } = useContext(cartContext);

  const { getWishList } = useContext(wishContext);

  // get router
  const router = useRouter();

  // user object to store user data
  let user = {
    email: "",
    password: "",
  };

  // function to handle form submit
  const handleSubmit = (values) => {
    // set loading to true
    setLoading(true);

    // send post request
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((data) => {
        toast.success(data.data.message);

        // set token
        setToken(data.data.token);

        // get cart products
        getCartProducts();

        // get wish list
        getWishList();

        // set token in local storage or session storage
        if (rememberMe) {
          localStorage.setItem("token", data.data.token);
        } else {
          sessionStorage.setItem("token", data.data.token);
        }

        // redirect to home page
        setTimeout(() => {
          router.push("/");
        }, 2000);

        // set loading to false
        setLoading(false);
      })
      // catch error
      .catch((error) => {
        toast.error("Error: " + error.response.data.message);
      });
  };

  // validation schema
  let validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
      )
      .required("Password is required"),
  });

  // use formik hook to handle form
  const formil = useFormik({
    // initial values of form
    initialValues: user,

    // function to handle form submit
    onSubmit: handleSubmit,

    // validation schema
    validationSchema: validationSchema,
  });

  return (
    <>
      <div className="md:w-[80%] mx-auto border rounded-2xl shadow-2xl m-5 p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="hidden md:block">
            <Image
              src="./login.jpg"
              alt="logo"
              width={1000}
              height={1000}
              className="w-full rounded-xl"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-5">Signin</h1>

            <form className="space-y-6 p-3" onSubmit={formil.handleSubmit}>
              <div className="relative z-0">
                <input
                  type="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={formil.values.email}
                  onChange={formil.handleChange}
                  onBlur={formil.handleBlur}
                />
                <label
                  htmlFor="email"
                  className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Email
                </label>

                {formil.touched.email && formil.errors.email ? (
                  <div className="text-red-600 pt-3">{formil.errors.email}</div>
                ) : null}
              </div>

              <div className="relative z-0">
                <input
                  type="password"
                  id="password"
                  className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={formil.values.password}
                  onChange={formil.handleChange}
                  onBlur={formil.handleBlur}
                />
                <label
                  htmlFor="password"
                  className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Password
                </label>

                {formil.touched.password && formil.errors.password ? (
                  <div className="text-red-600 pt-3">
                    {formil.errors.password}
                  </div>
                ) : null}
              </div>

              <Button className="w-full mt-3 cursor-pointer">
                {loading ? <SkewLoader /> : "Signin"}
              </Button>
            </form>

            {/* <Checkbox id="remember" /> */}
            <div className="flex items-center py-3">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="ml-2 block text-sm ">
                Remember me
              </label>
            </div>

            <p className="text-sm">
              Don&apos;t have an account?
              <Link
                href="/signup"
                className="font-medium text-blue-500 hover:underline dark:text-blue-500"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
