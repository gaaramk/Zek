"use client";

import { useState, useEffect, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { Heart, MoonStar, ShoppingBag, SunIcon } from "lucide-react";
import { authContext } from "../_context/AuthContext";
import { useRouter } from "next/navigation";
import api from "../_utils/Api";
import { cartContext } from "../_context/CartContext";
import { wishContext } from "../_context/WishContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const { token, setToken } = useContext(authContext);
  const { numOfCartItem } = useContext(cartContext);
  const { numOfWish } = useContext(wishContext);
  const router = useRouter();

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setToken(null);
    router.push("/signin");
  };

  const categories = () => {
    api.getAllCategories().then((res) => {
      setCategory(res);
    });
  };



  useEffect(() => {
    categories();

    // Check if dark mode was previously set
    if (localStorage.getItem("darkMode") === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div
      className={` fixed w-full top-0 z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="m-5 p-3 rounded-2xl dark:bg-primary-foreground bg-white ">
        <div className="  flex flex-wrap justify-between items-center mx-auto max-w-screen-xl ">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="./logo.png"
              className="mr-3 rounded-full object-cover"
              alt="Logo"
              width={30}
              height={30}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              ZEK | Platform
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 17 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>


          {/* Desktop menu */}
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="w-full flex flex-col p-4 md:p-0 items-center border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:border-0">
              {["Home", "Products", "All orders"].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${
                      item.toLowerCase() === "home"
                        ? ""
                        : item.toLowerCase().split(" ").join("")
                    }`}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:text-blue-500"
                  >
                    {item}
                  </Link>
                </li>
              ))}

              <li>
                <button
                  className="flex items-center justify-between w-full text-gray-900 rounded-sm md:w-auto dark:text-white dark:hover:text-blue-500"
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                  }}
                >
                  Categories
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    fill="none"
                    viewBox="0 0 10 6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
              </li>

              {token ? (
                <>
                  <li className="md:hidden">
                    <Link
                      href="/cart"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white dark:hover:text-blue-500"
                    >
                      Cart ({numOfCartItem})
                    </Link>
                  </li>

                  <li className="md:hidden">
                    <Link
                      href="/wishlist"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white dark:hover:text-blue-500"
                    >
                      Wishlist ({numOfWish})
                    </Link>
                  </li>

                  <li className="md:hidden">
                    <Link
                      href="/orders"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white dark:hover:text-blue-500"
                    >
                      All Orders
                    </Link>
                  </li>

                  <li>
                    <label className="inline-flex items-center cursor-pointer pt-3 md:pt-0">
                      <input
                        type="checkbox"
                        defaultValue
                        className="sr-only peer"
                        onChange={toggleDarkMode}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {darkMode ? <MoonStar /> : <SunIcon />}
                      </span>
                    </label>
                  </li>

                  <li className="md:block hidden">
                    <Link
                      href="/cart"
                      className="relative rounded-sm hover:text-blue-600 dark:text-white dark:hover:text-blue-500"
                    >
                      <ShoppingBag />
                      <span
                        className="absolute inline-flex items-center justify-center
                                w-4 h-4 text-xs font-bold text-white bg-red-500 
                                rounded-full -top-2 -right-2 border-red-500 border-2"
                      >
                        {numOfCartItem}
                      </span>
                    </Link>
                  </li>

                  <li className="md:block hidden">
                    <Link
                      href="/wishlist"
                      className="relative rounded-sm hover:text-blue-600 dark:text-white dark:hover:text-blue-500"
                    >
                      <Heart />
                      <span
                        className="absolute inline-flex items-center justify-center
                                w-4 h-4 text-xs font-bold text-white bg-red-500 
                                rounded-full -top-2 -right-2 border-red-500 border-2"
                      >
                        {numOfWish}
                      </span>
                    </Link>
                  </li>

                  <li>
                    <div className="hidden md:block">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="rounded-2xl mt-5 bg-white dark:text-gray-900 p-2 w-56">
                          <DropdownMenuLabel className="p-2">
                            My Account
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="p-2">
                            <Link href="/cart">Cart ({numOfCartItem})</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="p-2">
                            <Link href="/wishlist">Wishlist ({numOfWish})</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="p-2">
                            <Link href="/allorders">All Orders</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span
                              onClick={handleLogout}
                              className="cursor-pointer"
                            >
                              Logout
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <span
                      className="md:hidden block py-2 px-3 cursor-pointer text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white dark:hover:text-blue-500"
                      onClick={handleLogout}
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="md:hidden">
                    <Link
                      href="/signin"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white dark:hover:text-blue-500"
                    >
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/signin"
                      className="md:hidden block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white dark:hover:text-blue-500"
                    >
                      Sign In
                    </Link>
                  </li>

                  <li>
                    <label className="inline-flex items-center cursor-pointer pt-3 md:pt-0">
                      <input
                        type="checkbox"
                        defaultValue
                        className="sr-only peer"
                        onChange={toggleDarkMode}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {darkMode ? <MoonStar /> : <SunIcon />}
                      </span>
                    </label>
                  </li>

                  <li>
                    <div className="hidden md:flex gap-3">
                      <Link href="/signin">Sign In</Link>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {dropdownOpen && (
          <div className="max-h-[300px] overflow-y-scroll bg-gray-50 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-600 ">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 ">
              {category.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/categories/${cat._id}`}
                  className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div>
                    <div className="font-semibold">{cat.name}</div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {cat.slug}
                    </span>
                  </div>

                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={100}
                    height={100}
                    className="w-10 h-10 object-cover rounded-full"
                    unoptimized
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
