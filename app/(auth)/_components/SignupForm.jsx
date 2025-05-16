"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { SkewLoader } from "react-spinners";
import * as yup from "yup";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  let userSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(25, "Name must be at most 25 characters")
      .required("Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    rePassword: yup
      .string()
      .required("Re-password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(
        /^01[0125][0-9]{8}$/,
        'Phone number must be in the format "01XXXXXXXXX"'
      ),
  });

  const handleSubmit = (values) => {
    setLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((data) => {
        toast.success(data.data.message);

        setLoading(false);

        setTimeout(() => {
          router.push("/");
        }, 2000);
      })
      .catch((error) => {
        toast.error("Error: " + error.response.data.message);
        setLoading(false);
      });

    console.log(data.response.data.message);
  };

  const formik = useFormik({
    initialValues: user,
    onSubmit: handleSubmit,
    validationSchema: userSchema,
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
            <h1 className="text-3xl font-bold mb-5">Signup</h1>

            <form
              className="space-y-6 p-3 capitalize"
              onSubmit={formik.handleSubmit}
            >
              <div className="relative z-0">
                <input
                  type="text"
                  id="name"
                  className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="name"
                  className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  name
                </label>

                {formik.touched.name && formik.errors.name ? (
                  <p className="text-red-500 pt-3">{formik.errors.name}</p>
                ) : null}
              </div>

              <div className="relative z-0">
                <input
                  type="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="email"
                  className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Email
                </label>

                {formik.touched.email && formik.errors.email ? (
                  <p className="text-red-500 pt-3">{formik.errors.email}</p>
                ) : null}
              </div>

              <div className="relative z-0">
                <input
                  type="password"
                  id="password"
                  className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="password"
                  className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Password
                </label>

                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-500 pt-3">{formik.errors.password}</p>
                ) : null}
              </div>

              <div className="relative z-0">
                <input
                  type="password"
                  id="rePassword"
                  className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label
                  htmlFor="rePassword"
                  className="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  re-Password
                </label>

                {formik.touched.rePassword && formik.errors.rePassword ? (
                  <p className="text-red-500 pt-3">
                    {formik.errors.rePassword}
                  </p>
                ) : null}
              </div>

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
                  Phone
                </label>

                {formik.touched.phone && formik.errors.phone ? (
                  <p className="text-red-500 pt-3">{formik.errors.phone}</p>
                ) : null}
              </div>

              <Button className="w-full mt-3 cursor-pointer">
                {loading ? <SkewLoader /> : "Signup"}
              </Button>
            </form>

            <p className="text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-medium text-blue-500 hover:underline dark:text-blue-500"
              >
                Signin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
