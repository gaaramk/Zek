"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  LucideArrowDownWideNarrow,
} from "lucide-react";
import Product from "@/app/_components/Product";
import Api from "@/app/_utils/Api";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [sortMode, setSortMode] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get all products
  const getProducts = async () => {
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Get all categories
  const fetchCategories = async () => {
    try {
      const res = await Api.getAllCategories();
      setCategoryList(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
    fetchCategories();
  }, []);

  // Filtered & sorted products
  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category?.name === selectedCategory
      );
    }

    switch (sortMode) {
      case "priceDown":
        return filtered.sort((a, b) => b.price - a.price);
      case "priceUp":
        return filtered.sort((a, b) => a.price - b.price);
      case "saling":
        return filtered.sort((a, b) => b.sold - a.sold);
      case "rating":
        return filtered.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
      default:
        return filtered;
    }
  };

  const sortedProducts = getFilteredAndSortedProducts();

  return (
    <div className="mt-9">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Sort Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 border rounded-md shadow-sm bg-white dark:bg-gray-900 text-sm font-medium flex items-center gap-2">
            Sort By <LucideArrowDownWideNarrow size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Sort Products</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSortMode("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortMode("priceUp")}>
              <div className="flex items-center gap-2">
                Price (L to H) <ArrowUpIcon size={14} />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortMode("priceDown")}>
              <div className="flex items-center gap-2">
                Price (H to L) <ArrowDownIcon size={14} />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortMode("saling")}>
              Best Selling
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortMode("rating")}>
              Top Rated
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Category Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 border rounded-md shadow-sm bg-white dark:bg-gray-900 text-sm font-medium flex items-center gap-2">
            Category <LucideArrowDownWideNarrow size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSelectedCategory("all")}>
              All Categories
            </DropdownMenuItem>
            {categoryList.map((item) => (
              <DropdownMenuItem
                key={item._id}
                onClick={() => setSelectedCategory(item.name)}
              >
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
