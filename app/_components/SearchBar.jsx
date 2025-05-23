"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Product from "./Product";
import Api from "../_utils/Api";

const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const allProducts = () => {
    Api.getProducts().then((res) => {
      setProducts(res);
    });
  };

  useEffect(() => {
    allProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="w-full py-24">
        <div className="container">
          <div>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>

              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border-b bg-gray-50 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search for products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {search && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-9">
              {filteredProducts.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchBar;
